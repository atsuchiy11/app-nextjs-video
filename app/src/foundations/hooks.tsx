import useSWR, { mutate as _mutate } from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import {
	getBanners,
	getCategories,
	getHistory,
	getPath,
	getPaths,
	getTags,
	getUsers,
	getVideo,
	getVideoRows,
	getVideos,
} from 'src/data/fetcher'
import { useState } from 'react'

/**
 * [Note] 複雑なフックは別ファイルにする
 */

/**
 * hook load video cache for any video
 * @param {String} id video id
 * @returns video data and state
 */
export const useVideo = () => {
	const router = useRouter()
	const id = router.asPath.split('?')[0].split('/')[2]
	const { data, error, mutate } = useSWR(`/video/${id}`, getVideo)
	return {
		video: data,
		videoLoading: !error && !data,
		videoError: error,
		mutate,
	}
}

/**
 * hook load tags cache
 * @returns videos data and state
 */
export const useVideos = () => {
	const { data, error, mutate } = useSWR(`/videos`, getVideos)
	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

/**
 * hook load video table rows cache
 * @returns table rows and state
 */
export const useVideoTable = () => {
	const { data, error, mutate } = useSWR(`/table/videos`, getVideoRows)
	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

/**
 * hook load tags cache
 * @returns tags data and state
 */
export const useTags = () => {
	const { data, error, mutate } = useSWR(`/tags`, getTags)
	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

/**
 * hook load categories cache
 * @returns categories data and state
 */
export const useCategories = () => {
	const { data, error, mutate } = useSWR(`/categories`, getCategories)
	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

export const usePath = () => {
	const router = useRouter()
	const id = router.query.id
	const { data, error, mutate } = useSWR(`/path/${id}`, getPath)

	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

/**
 * hook load paths cache
 * @returns paths data and state
 */
export const usePaths = () => {
	const { data, error, mutate } = useSWR(`/paths`, getPaths)
	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

/**
 * hook load history cache for any user
 * @returns history data and state
 */
export const useHistory = () => {
	const [session] = useSession()
	const user = session.user.email
	const { data, error, mutate } = useSWR(`/history/${user}`, getHistory)
	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

/**
 * hook load users cache
 * @returns users data and state
 */
export const useUsers = () => {
	const { data, error, mutate } = useSWR(`/users`, getUsers)
	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

/**
 * hook load banners cache
 * @returns banner data and state
 */
export const useBanner = () => {
	const { data, error, mutate } = useSWR(`/banners`, getBanners)
	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	}
}

/**
 * hook input element
 * @param {String} initialValue state initial value
 * @returns input value and state
 */
export const useInput = (initialValue) => {
	const [value, setValue] = useState(initialValue)
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setValue(e.target.value)

	return [{ value, onChange }, () => setValue(initialValue)] as [
		{
			value: string
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
		},
		() => void
	]
}
