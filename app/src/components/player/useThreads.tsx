import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getThreads } from 'src/data/fetcher'
import { useAppContext } from 'src/foundations/AppProvider'
import { useState, useEffect } from 'react'

/**
 * hook load threads cache for any video
 * @returns threads data and state
 */
const useThreads = () => {
	const { state, dispatch } = useAppContext()
	const router = useRouter()
	const id = router.query.id as string
	const { data, error, mutate } = useSWR(`/thread/${id}`, getThreads)

	// このロジックまとめられるかも。。
	/** editor state */
	const [openEditor, setOpenEditor] = useState({})
	const handleEditor = (e: React.MouseEvent<HTMLButtonElement>) => {
		const label = e.currentTarget.getAttribute('aria-label')
		const newState = { ...openEditor, [label]: !openEditor[label] }
		setOpenEditor(newState)
	}

	/** handle edit mode */
	const [editMode, setEditMode] = useState({})
	const handleEditMode = (
		e: React.MouseEvent<HTMLButtonElement>,
		_label = null
	) => {
		const label = _label || e.currentTarget.getAttribute('aria-label')
		const newState = { ...editMode, [label]: !editMode[label] }
		setEditMode(newState)
	}

	const setOpen = () => {
		dispatch({ openThread: { payload: !state.openThread } })
	}

	/** initialize local state */
	useEffect(() => {
		if (!data) return
		const newOpenEditor = {}
		const newEditMode = {}
		data.map((thread) => {
			const [post, reply] = thread.SK.split('_')
			if (post == reply) {
				if (!(thread.SK in newOpenEditor))
					newOpenEditor[thread.SK] = false
			}
			if (!(thread.SK in newEditMode)) newEditMode[thread.SK] = false
		})
		setOpenEditor(newOpenEditor)
		setEditMode(newEditMode)
	}, [data])

	return {
		threads: data,
		threadLoading: !error && !data,
		threadError: error,
		mutate,
		open: state.openThread,
		setOpen,
		openEditor,
		handleEditor,
		editMode,
		handleEditMode,
	}
}
export default useThreads
