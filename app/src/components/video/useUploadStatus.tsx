import useSWR from 'swr'
import axios from 'src/foundations/axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { getStatus } from 'src/data/fetcher'
import {
	ReqUploadStatusPost,
	ReqUploadStatusPut,
	ReqVideoPut,
	UploadStatus,
	VideoDB,
	VideoVimeo,
} from 'src/interfaces/api'

export const IN_UPLOAD = 'アップロード中'
export const IN_ENCODE = 'エンコード中'
export const COMPLETED = '完了'
export const FAILED = '失敗'

const useUploadStatus = () => {
	const router = useRouter()
	const [session] = useSession()
	const { data, error } = useSWR(`/upload/status`, getStatus)

	/** post upload status */
	const post = async (params: ReqUploadStatusPost) => {
		try {
			const res = await axios.post(`/upload/status`, params)
			if (res.status != 200) throw new Error('failed to update status.')
			return Promise.resolve(res.data)
		} catch (err) {
			throw new Error(err.message)
		}
	}

	/** put upload status */
	const put = async (params: ReqUploadStatusPut) => {
		try {
			const res = await axios.put(`/upload/status`, params)
			if (res.status != 200) throw new Error('failed to update status.')
			return Promise.resolve(res.data)
		} catch (err) {
			throw new Error(err.message)
		}
	}

	/** get upload status from vimeo */
	const getLatestStatus = async (video: UploadStatus) => {
		const id = video.PK.split('/')[2]
		try {
			const res = await axios.get(`/video/status/?video_id=${id}`)
			if (res.status != 200) throw new Error('failed to get status.')
			const currentStatus = res.data.transcode_status

			let newStatus = null
			if (currentStatus == 'complete') {
				newStatus = COMPLETED
			} else if (currentStatus == 'in_progress') {
				return Promise.resolve(false)
			} else {
				newStatus = FAILED
			}
			if (!newStatus) throw new Error("can't get current status.")

			return Promise.resolve(newStatus)
		} catch (err) {
			throw new Error(err.message)
		}
	}

	/** update upload status */
	const updateStatus = async (video: UploadStatus, newStatus: string) => {
		try {
			const res = await axios.put('/upload/status', {
				uri: video.PK,
				timestamp: video.createdAt,
				status: newStatus,
			})
			if (res.status != 200) throw new Error('failed to update status.')
			return Promise.resolve()
		} catch (err) {
			throw new Error(err.message)
		}
	}

	/** update video meta data */
	// duration, thumbnailを更新する？？
	const updateVideo = async (video) => {
		try {
			const id = video.PK.split('/')[2]
			const vimeo = await axios
				.get<VideoVimeo>(`/vimeo/video/${id}`)
				.then((res) => res.data)
			const db = await axios
				.get<VideoDB>(`/video/${id}`)
				.then((res) => res.data)

			const params: ReqVideoPut = {
				PK: video.PK,
				user: session.user.email,
			}
			const diffParams = Object.keys(vimeo).reduce(
				(obj, key) =>
					db[key] != vimeo[key] ? { ...obj, [key]: vimeo[key] } : obj,
				params
			)
			const res = await axios.put(`/video`, diffParams)
			if (res.status != 200) throw new Error('failed to update video')
			return Promise.resolve()
		} catch (err) {
			throw new Error(err.message)
		}
	}

	const update = async (video: UploadStatus) => {
		try {
			const newStatus = await getLatestStatus(video)
			if (!newStatus) return Promise.resolve()
			await updateStatus(video, newStatus)
			await updateVideo(video)

			return Promise.resolve()
		} catch (err) {
			throw new Error(err.message)
		}
	}

	/** update status */
	useEffect(() => {
		if (!data) return
		if (router.asPath != '/admin') return

		const iterator = async () => {
			const promises = data.map((video) => {
				if (video.status == IN_ENCODE) return update(video)
			})
			Promise.all(promises)
				.then(() => console.log('status updated'))
				.catch((err) => {
					throw new Error(err.message)
				})
		}
		iterator()
	}, [data])

	return {
		postStatus: post,
		putStatus: put,
		status: data,
		statusError: error,
	}
}
export default useUploadStatus
