/**
 * 正直APIサーバとしては機能が貧弱なので（というか面倒くさい）テストに留める
 */

import * as AWS from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'

const region = 'ap-northeast-1'
const dynamoDbClient = createDynamoDbClient(region)

function createDynamoDbClient(regionName) {
	AWS.config.update({ region: regionName })
	return new AWS.DynamoDB.DocumentClient({
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	})
}

function createGetItemInput(key) {
	return {
		TableName: 'VideoJoinOthers',
		Key: {
			VideoId: key,
			SortKey: key,
		},
	}
}

/** GetItem */
async function executeGetItem(dynamoDbClient, getItemInput) {
	try {
		const getItemOutput = await dynamoDbClient.get(getItemInput).promise()
		console.log('GetItem executed successfully.')
		return getItemOutput
	} catch (err) {
		console.log(err)
		handleScanError(err)
		return err
	}
}

/** Error handler */
function handleScanError(err) {
	if (!err) {
		console.error('Encountered error object was empty')
		return
	}
	if (!err.code) {
		console.error(
			`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(
				err
			)}`
		)
		return
	}
	// here are no API specific errors to handle for Scan, common DynamoDB API errors are handled below
	handleCommonErrors(err)
}

function handleCommonErrors(err) {
	switch (err.code) {
		case 'InternalServerError':
			console.error(
				`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`
			)
			return
		case 'ProvisionedThroughputExceededException':
			console.error(
				`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. ` +
					`Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`
			)
			return
		case 'ResourceNotFoundException':
			console.error(
				`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`
			)
			return
		case 'ServiceUnavailable':
			console.error(
				`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`
			)
			return
		case 'ThrottlingException':
			console.error(
				`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`
			)
			return
		case 'UnrecognizedClientException':
			console.error(
				`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. ` +
					`Error: ${err.message}`
			)
			return
		case 'ValidationException':
			console.error(
				`The input fails to satisfy the constraints specified by DynamoDB, ` +
					`fix input before retrying. Error: ${err.message}`
			)
			return
		case 'RequestLimitExceeded':
			console.error(
				`Throughput exceeds the current throughput limit for your account, ` +
					`increase account level throughput before retrying. Error: ${err.message}`
			)
			return
		default:
			console.error(
				`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`
			)
			return
	}
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.query)
	const { key } = req.query

	const inputParams = createGetItemInput(key)
	executeGetItem(dynamoDbClient, inputParams)
		.then((resp) => {
			res.status(200).json(resp)
		})
		.catch((err) => {
			res.status(500).json({
				statusCode: 500,
				message: err.message,
			})
		})
	return
}
export default handler
