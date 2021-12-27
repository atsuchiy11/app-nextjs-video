/**
 * 正直APIサーバとしては機能が貧弱なので（というか面倒くさい）テストに留める
 * ScanだけSSGするのでexportする
 */

import * as AWS from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'

const region = 'ap-northeast-1'
const dynamoDbClient = createDynamoDbClient(region)

export function createDynamoDbClient(regionName) {
	AWS.config.update({ region: regionName })
	return new AWS.DynamoDB.DocumentClient({
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	})
}

export function createScanInput() {
	return {
		TableName: 'VideoJoinOthers',
		ConsistentRead: false,
		FilterExpression: 'attribute_exists(#06910)',
		ExpressionAttributeNames: {
			'#06910': 'TagName',
		},
	}
}

function createUpdateItemInput(key, value) {
	return {
		TableName: 'VideoJoinOthers',
		Key: {
			VideoId: key,
			SortKey: key,
		},
		UpdateExpression: 'SET #f2210 = :f2210',
		ExpressionAttributeValues: {
			':f2210': value,
		},
		ExpressionAttributeNames: {
			'#f2210': 'TagName',
		},
	}
}

/** Scan */
export async function executeScan(dynamoDbClient, scanInput) {
	try {
		const scanOutput = await dynamoDbClient.scan(scanInput).promise()
		console.info('Scan successful.')
		return scanOutput
	} catch (err) {
		handleScanError(err)
	}
}

/** Update */
async function executeUpdateItem(dynamoDbClient, updateItemInput) {
	try {
		const updateItemOutput = await dynamoDbClient
			.update(updateItemInput)
			.promise()
		console.info('Successfully updated item.')
		return updateItemOutput
	} catch (err) {
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
	let inputParams
	let json
	switch (req.method) {
		case 'GET':
			inputParams = createScanInput()
			executeScan(dynamoDbClient, inputParams)
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
		case 'POST':
			json = JSON.parse(req.body)
			inputParams = createUpdateItemInput(json.key, json.value)
			executeUpdateItem(dynamoDbClient, inputParams)
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
		default:
			return
	}
}
export default handler
