import { useEffect, useState } from 'react'
import axios from 'src/foundations/axios'
import useSWR, { mutate as _mutate } from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { getLikes } from 'src/data/fetcher'
import { Like, ReqLikePost, ReqLikeDelete } from 'src/interfaces/api'

/**
 * hook load likes cache for any video
 * @returns likes data and state
 */
const useLikes = () => {
	const [session] = useSession()
	const router = useRouter()

	const user = session.user.email
	const id = router.query.id as string

	const [goodColor, setGoodColor] = useState<'inherit' | 'primary'>('inherit')
	const [badColor, setBadColor] = useState<'inherit' | 'primary'>('inherit')
	const { data, error, mutate } = useSWR(`/like/${id}`, getLikes)

	/** add good or bad rate to video */
	const post = async (params: ReqLikePost) => {
		try {
			const res = await axios.post(`/like`, params)
			if (res.status == 200) {
				console.info('success to update like.')
				// 高評価 or 低評価アイコンの色をprimaryにする
				params.like ? setGoodColor('primary') : setBadColor('primary')
				_mutate(`/like/${id}`)
			} else {
				console.warn('failed to update like.')
			}
		} catch (err) {
			console.error(err)
			throw new Error(err.message)
		}
	}

	/** remove good or bad rate from video */
	const remove = async (id: string, like: boolean, rates: Like[]) => {
		// find your rating
		const self = rates.find((rate) => rate.createdUser == user)
		if (!self) return

		const params: ReqLikeDelete = {
			video: `/videos/${id}`,
			id: self.SK,
		}
		try {
			const res = await axios.delete(`/like`, { data: params })
			if (res.status == 200) {
				console.info('success to remove like.')
				// 高評価 or 低評価アイコンの色をinheritにする
				like ? setGoodColor('inherit') : setBadColor('inherit')
				_mutate(`/like/${id}`)
			} else {
				console.warn('failed to remove like.')
			}
		} catch (err) {
			console.error(err)
			throw new Error(err.message)
		}
	}

	/** event handler */
	const handler = (like: boolean) => {
		const params: ReqLikePost = {
			video: `/videos/${id}`,
			user,
			like,
		}

		if (like) {
			if (goodColor == 'inherit') post(params)
			else remove(id, like, data.good)
		} else {
			if (badColor == 'inherit') post(params)
			else remove(id, like, data.bad)
		}
	}

	/** if you rate it, change icon color */
	useEffect(() => {
		if (!data) return

		const findYourRate = (rates) =>
			rates.find((rate) => rate.createdUser == user)
		// good
		if (findYourRate(data.good)) setGoodColor('primary')
		else setGoodColor('inherit')
		// bad
		if (findYourRate(data.bad)) setBadColor('primary')
		else setBadColor('inherit')
	}, [data])

	return {
		likes: data,
		likeLoading: !error && !data,
		likeError: error,
		mutate,
		goodColor,
		badColor,
		handleLike: handler,
	}
}
export default useLikes
