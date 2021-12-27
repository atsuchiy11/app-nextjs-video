import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useState } from 'react'
import { useSession } from 'next-auth/client'
import { useTips } from 'src/atoms/Tips'
import { useSpinner } from 'src/atoms/Spinner'

import { Tag, ReqTagPost } from 'src/interfaces/api'

/**
 * タグ登録のメタデータを管理するフック
 * @param handler handler for notice parent component
 * @returns
 */
const useTagCreate = (
	handler: (value: React.SetStateAction<boolean>) => void
) => {
	const { showTips } = useTips()
	const { showSpinner } = useSpinner()

	const [session] = useSession()
	const user = session.user.email

	const [tag, setTag] = useState({} as Tag)
	const [titleErr, setTitleErr] = useState(false)

	/** listener input tag parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('tag-create-')[1]
		if (!(key in tag)) tag[key] = ''
		setTag({ ...tag, [key]: event.target.value })
		/** error cancel */
		if (key == 'name' && event.target.value != '') setTitleErr(false)
	}

	/** post tag meta data to db */
	const postData = async () => {
		const params: ReqTagPost = {
			name: tag.name,
			user,
		}
		if ('description' in tag) params['description'] = tag.description
		if ('note' in tag) params['note'] = tag.note

		try {
			const res = await axios.post('/tag', params)
			console.log(res.data)
			if (res.status != 200) throw new Error('failed to upload db')
			/** if duplicate tag name */
			if (res.data.duplicate) {
				showTips('タグ名が重複しています！', 'warning')
			} else {
				mutate('/tags')
				showTips('タグを作成しました', 'info')
			}
			setTag({} as Tag)
			showSpinner(false)
			handler((value) => !value)
		} catch (err) {
			throw new Error(err)
		}
	}

	/** submit */
	const handleSubmit = (okCancel: boolean) => {
		if (!okCancel) {
			handler((value) => !value)
			setTag({} as Tag)
			return
		}

		/** validate */
		if (!tag.name || tag.name == '') {
			setTitleErr(true)
			showTips('名前はさすがに必要でしょ。。', 'info')
			return
		}
		showSpinner(true)
		postData()
	}

	return [
		{
			state: tag,
			error: titleErr,
			handleInput: handleChange,
			handleSubmit,
		},
	]
}
export default useTagCreate
