import axios from 'src/foundations/axios'
import { ReqFile, ReqVideoPost, UploadFile } from 'src/interfaces/api'

/**
 * get upload URL from Vimeo
 * @param {object} params - post file request body
 * @returns
 */
export const getUploadURL = async (params: ReqFile) => {
	try {
		const res = await axios.post<UploadFile>('/upload', params)
		if (res.status !== 200) {
			throw new Error('faield to upload url.')
		}
		return Promise.resolve(res.data)
	} catch (err) {
		console.error(err)
		throw new Error(err)
	}
}

/**
 * post video meta to database
 * @param {object} params - post video request body
 * @returns
 */
export const postVideoData = async (params: ReqVideoPost) => {
	try {
		const res = await axios.post('/video', params)
		if (res.status != 200) {
			throw new Error('failed to update database.')
		}
		return Promise.resolve(res.data)
	} catch (err) {
		console.error(err)
		throw new Error(err)
	}
}
