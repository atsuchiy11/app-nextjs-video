import _ from 'lodash'
import axios from 'src/foundations/axios'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useTips } from 'src/atoms/Tips'
import { useSpinner } from 'src/atoms/Spinner'
import { usePath } from 'src/foundations/hooks'
import { Path, ReqPathPutTransact } from 'src/interfaces/api'

import arrayMove from 'array-move'
import { DropResult } from 'react-smooth-dnd'

// 直近二つのlearningPathIdsがおかしい（setになってる？）
// setもlistもJS的には同じなので放っておく

const usePathEdit = () => {
	const { showTips } = useTips()
	const { showSpinner } = useSpinner()

	const [session] = useSession()
	const user = session.user.email

	const [error, setError] = useState(true)
	const [currentPath, setcurrentPath] = useState({} as Path)
	const [prevPath, setPrevPath] = useState({} as Path)

	const { data: path, error: pathError } = usePath()

	/** listener input path parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('path-edit-')[1]
		setcurrentPath({ ...currentPath, [key]: event.target.value })
	}

	/** listener path invalid */
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.currentTarget.innerText
		if (target === '公開中')
			setcurrentPath({ ...currentPath, invalid: true })
		else setcurrentPath({ ...currentPath, invalid: false })
	}

	/** listener plyaback order */
	const onDrop = (dropResult: DropResult) => {
		const { removedIndex, addedIndex } = dropResult
		// removedIndexとaddedIndexの配列順序を入れ替える
		setcurrentPath({
			...currentPath,
			videos: arrayMove(
				currentPath.videos,
				removedIndex || 0,
				addedIndex || 0
			),
		})
	}

	/** find changed state */
	const diffParams = () => {
		const appended = _.differenceWith(
			currentPath.videos,
			prevPath.videos,
			_.isEqual
		)
		const removed = _.differenceWith(
			prevPath.videos,
			currentPath.videos,
			_.isEqual
		)
		const changedMeta = _.omitBy(currentPath, (v, k) => prevPath[k] == v)
		const changedOrder = _.omitBy(
			currentPath.videos,
			(v, k) => prevPath.videos[k] == v
		)
		return { appended, removed, changedMeta, changedOrder }
	}

	/** generate request body */
	const getRequestBody = () => {
		const { appended, removed, changedMeta, changedOrder } = diffParams()
		const params: ReqPathPutTransact = {
			PK: currentPath.PK,
			user,
		}
		// if meta data changed,..
		if (changedMeta)
			Object.keys(changedMeta).map(
				(key) => (params[key] = changedMeta[key])
			)

		// if video apeended to playlist,..
		if (appended && appended.length > 0)
			params['appended'] = appended.map((video) => video.uri)

		// if video removed from plyalist,..
		if (removed && removed.length > 0)
			params['removed'] = removed.map((video) => video.uri)

		// if playback order changed,..
		if (changedOrder && Object.keys(changedOrder).length > 0) {
			const newOrders = currentPath.videos.map((path, index) => {
				return { ...path, order: index + 1 }
			})
			params['orders'] = newOrders
		}
		return params
	}

	/** put path */
	const putData = async (params) => {
		try {
			const res = await axios.put('/path', params)
			if (res.status != 200) throw new Error('failed to update paths.')
			showTips('再生リストを更新しました！', 'info')
			// setcurrentPath(path)
			setPrevPath(path)
			showSpinner(false)
		} catch (err) {
			throw new Error(err)
		}
	}

	/** submit state */
	const handleSubmit = () => {
		// prevPathが空（再生リストが空）の場合の処理が必要。。
		const params = getRequestBody()
		if (Object.keys(params).length > 2) {
			showSpinner(true)
			putData(params)
		} else showTips('あれ、何も変えてないですよね？', 'info')
	}

	/** validate */
	useEffect(() => {
		if (pathError) setError(true)
		else setError(false)
	}, [pathError])

	/** inistialize */
	useEffect(() => {
		if (!path) return
		setcurrentPath(path)
	}, [path])

	/** state curent path */
	useEffect(() => {
		if (!path || prevPath.PK) return
		setPrevPath(path)
	}, [path])

	return [
		{
			state: currentPath,
			setState: setcurrentPath,
			error,
			handleInput: handleChange,
			handleInvalid: handleClick,
			onDrop,
			handleSubmit,
		},
	]
}
export default usePathEdit
