import { useEffect, useState } from 'react'
import useSWR, { mutate as _mutate } from 'swr'
import axios from 'src/foundations/axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useTips } from 'src/atoms/Tips'

import { getFavorite } from 'src/data/fetcher'
import { ReqFavorite } from 'src/interfaces/api'

/**
 * hook load favorite cache for any user
 * @returns favorite data and state and handler
 */
const useFavorite = () => {
	const [session] = useSession()
	const router = useRouter()
	const { showTips } = useTips()

	const user = session.user.email
	const id = router.query.id

	const [color, setColor] = useState<'inherit' | 'primary'>('inherit')
	const { data, error, mutate } = useSWR(`/favorite/${user}`, getFavorite)

	/** add favorite of video */
	const post = async (params: ReqFavorite) => {
		try {
			const res = await axios.post(`/favorite`, params)
			if (res.status == 200) {
				console.info('success to update favorite.')
				setColor('primary')
				showTips('動画をお気に入りに登録しましたw', 'info')
			} else {
				console.warn('failed to update favorite.')
			}
		} catch (err) {
			console.error(err)
			throw new Error(err.message)
		}
	}

	/** remove favorite of video */
	const remove = async (params: ReqFavorite) => {
		try {
			const res = await axios.delete(`/favorite`, {
				data: params,
			})
			if (res.status == 200) {
				console.info('success to remove favorite.')
				setColor('inherit')
				showTips('動画をお気に入りから削除しました><', 'info')
			} else {
				console.warn('failed to remove favorite.')
			}
		} catch (err) {
			console.error(err)
			throw new Error(err.messsage)
		}
	}

	/** event handler */
	const handler = () => {
		const params: ReqFavorite = {
			user,
			video: `/videos/${id}`,
		}
		if (color === 'inherit') post(params)
		else remove(params)
	}

	/** initialize icon color */
	useEffect(() => {
		if (!data) return
		// detail view only
		if (router.pathname != '/player/[id]') return

		if (data.find((d) => d.SK.split('/')[2] == router.query.id))
			setColor('primary')
		else setColor('inherit')
	}, [data])

	return {
		favorite: data,
		favoriteLoading: !error && !data,
		favoriteError: error,
		mutate,
		favoriteColor: color,
		handleFavorite: handler,
	}
}
export default useFavorite
