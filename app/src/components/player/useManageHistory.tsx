import axios from 'src/foundations/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useAppContext } from 'src/foundations/AppProvider'
import { mutate } from 'swr'
import { ReqHistory } from 'src/interfaces/api'
import { getYYYYMMDDHHMMSS } from 'src/foundations/util'
import { useVideo } from 'src/foundations/hooks'
import { PauseEvent } from '@u-wave/react-vimeo'

const useManageHistory = () => {
	const { state, dispatch } = useAppContext()
	const router = useRouter()
	const [session] = useSession()
	const { video } = useVideo()

	/** register history asynchronous */
	const handleHistory = () => {
		const postData = async () => {
			try {
				const res = await axios.post('/history', state.localHistory)
				if (res.status == 200) console.info('success to update history')
				else console.warn('failed to update history')
				mutate(`/history/${session.user.email}`)
			} catch (err) {
				console.error(err)
			}
		}
		postData()
	}

	/** video started */
	const onReady = () => {
		const newHistory: ReqHistory = {
			...state.localHistory,
			createdAt: getYYYYMMDDHHMMSS(),
			user: session.user.email,
			video: video.uri,
			referrer: router.asPath,
		}
		dispatch({ localHistory: { payload: newHistory } })
	}

	/** video parsed */
	const onPause = (event: PauseEvent) => {
		const newHistory: ReqHistory = {
			...state.localHistory,
			parse: event.percent,
		}
		dispatch({ localHistory: { payload: newHistory } })
	}

	/** video finished */
	const onEnd = (_: PauseEvent) => {
		const newHistory: ReqHistory = {
			...state.localHistory,
			finishedAt: getYYYYMMDDHHMMSS(),
		}
		dispatch({ localHistory: { payload: newHistory } })
	}

	/** add event when you leave this page */
	useEffect(() => {
		router.events?.on('routeChangeStart', handleHistory)
		return () => router.events?.off('routeChangeStart', handleHistory)
	}, [state.localHistory])

	/** initialize history */
	useEffect(() => {
		const history = state.localHistory
		Object.keys(history).map((key) => {
			if (key == 'parse') state.localHistory[key] = 0
			else state.localHistory[key] = ''
		})
		dispatch({ localHistory: { payload: history } })
	}, [])

	return {
		onReady,
		onPause,
		onEnd,
	}
}
export default useManageHistory
