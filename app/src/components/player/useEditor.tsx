import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useInput } from 'src/foundations/hooks'
import { useTips } from 'src/atoms/Tips'
import { ReqThreadPost, ReqThreadPut } from 'src/interfaces/api'

const useEditor = (initialValue, handler) => {
	const [session] = useSession()
	const router = useRouter()
	const { showTips } = useTips()

	const user = session.user.email
	const id = router.query.id as string

	const [editorProps, resetEditor] = useInput(initialValue)

	/** update thread */
	const update = async (label: string, e) => {
		const params: ReqThreadPut = {
			video: `/videos/${id}`,
			id: label,
			body: editorProps.value,
		}
		try {
			const res = await axios.put(`/thread`, params)
			if (res.status == 200) {
				console.info('success to update thread.')
				mutate(`/thread/${router.query.id}`)
				handler(e, label)
			} else {
				console.warn('failed to update thread')
			}
		} catch (err) {
			console.error(err)
			throw new Error(err.message)
		}
	}
	/** add new or replay thread */
	const post = async (label: string) => {
		const params: ReqThreadPost = {
			video: `/videos/${id}`,
			user,
			body: editorProps.value,
		}
		// ラベル管理微妙すぎる。。
		if (label != 'new-thread') {
			const post = label.split('_')[0]
			params['thread'] = post
		}
		try {
			const res = await axios.post(`/thread`, params)
			if (res.status == 200) {
				console.info('success to update thread.')
				mutate(`/thread/${id}`)
				resetEditor()
			} else {
				console.warn('faield to update thread')
			}
		} catch (err) {
			console.error(err)
			throw new Error(err.message)
		}
	}

	/** event listener */
	const handleThread = (e: React.MouseEvent<HTMLButtonElement>) => {
		const label = e.currentTarget.getAttribute('aria-label')
		if (editorProps.value == '') {
			showTips('あれ、まだコメントしてませんよ？', 'info')
			return
		}
		if (initialValue) update(label, e)
		else post(label)
	}

	return {
		editorProps,
		resetEditor,
		handleThread,
	}
}
export default useEditor
