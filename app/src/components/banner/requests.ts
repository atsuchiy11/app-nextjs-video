import axios from 'src/foundations/axios'
import { BannerImage, ReqBannerPost, ReqBannerPut } from 'src/interfaces/api'

/**
 * upload image file to S3 bucket
 * @param {object} image image file object
 * @returns
 */
export const uploadImage = async (image: File) => {
	const params = new FormData()
	params.append('image', image)
	const headers = { 'Content-Type': 'multipart/form-data' }
	try {
		const res = await axios.post<BannerImage>('/banner/image', params, {
			headers,
		})
		if (res.status != 200) {
			console.error(res.data)
			throw new Error('failed to upload image to S3.')
		}
		return Promise.resolve(res.data)
	} catch (err) {
		throw new Error(err.message)
	}
}
/**
 * post banner to db
 * @param {object} params post banner request body
 * @returns
 */
export const postBanner = async (params: ReqBannerPost) => {
	try {
		const res = await axios.post('/banner', params)
		if (res.status != 200) throw new Error(res.data)
		return Promise.resolve(res.data)
	} catch (err) {
		throw new Error(err.message)
	}
}

/**
 * put banner to db
 * @param {object} params put banner request body
 */
export const putBanner = async (params: ReqBannerPut) => {
	try {
		const res = await axios.put('/banner', params)
		if (res.status != 200) {
			throw new Error('failed to update banner.')
		}
		return Promise.resolve(res.data)
	} catch (err) {
		throw new Error(err.message)
	}
}
