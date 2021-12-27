import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useState } from 'react'
import { useSession } from 'next-auth/client'
import { useTips } from 'src/atoms/Tips'
import { Path, ReqPathPost } from 'src/interfaces/api'

const usePathCreate = (
	handler: (value: React.SetStateAction<boolean>) => void
) => {
	const { showTips } = useTips()

	const [session] = useSession()
	const user = session.user.email

	const [path, setPath] = useState({} as Path)
	const [titleErr, setTitleErr] = useState(false)
	const [descriptionErr, setDescriptionErr] = useState(false)

	/** listener input video parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('path-create-')[1]
		if (!(key in path)) path[key] = ''
		setPath({ ...path, [key]: event.target.value })
		/** error cancel */
		if (key == 'name' && event.target.value != '') setTitleErr(false)
		if (key == 'description' && event.target.value != '')
			setDescriptionErr(false)
	}

	/** post playlist */
	const postData = async () => {
		const params: ReqPathPost = {
			name: path.name,
			description: path.description,
			user,
		}
		if ('note' in path) params['note'] = path.note
		try {
			const res = await axios.post('/path', params)
			if (res.status != 200) throw new Error('failed to update playlist')
			mutate('/paths')
			showTips('再生リストが追加されましたw', 'info')
			setPath({} as Path)
			handler((value) => !value)
		} catch (err) {
			console.error(err)
			throw new Error('failed to update playlist')
		}
	}

	/** submit state */
	const handleSubmit = (okCancel: boolean) => {
		if (!okCancel) {
			handler((value) => !value)
			setPath({} as Path)
			return
		}
		/** validate */
		if (!path.name || path.name == '') {
			setTitleErr(true)
			showTips('項目少ないんだからちゃんと入力しましょうw', 'info')
			return
		}
		if (!path.description || path.description == '') {
			setDescriptionErr(true)
			showTips('項目少ないんだからちゃんと入力しましょうw', 'info')
			return
		}
		postData()
	}

	return [
		{
			state: path,
			handleInput: handleChange,
			handleSubmit,
		},
		{
			title: titleErr,
			description: descriptionErr,
		},
	]
}
export default usePathCreate
