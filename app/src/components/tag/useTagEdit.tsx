import _ from 'lodash'
import axios from 'src/foundations/axios'
import { useState, useEffect } from 'react'
import { mutate } from 'swr'
import { useSession } from 'next-auth/client'
import { useTips } from 'src/atoms/Tips'
import { useSpinner } from 'src/atoms/Spinner'

import { ReqTagPut, Tag } from 'src/interfaces/api'

/**
 * タグ編集のメタデータを管理するフック
 * @param selectedRow selected category meta data
 * @param handler handler for notice parent component
 * @returns
 */
const useTagEdit = (
	selectedRow: Tag,
	handler: (value: React.SetStateAction<boolean>) => void
) => {
	const { showTips } = useTips()
	const { showSpinner } = useSpinner()

	const [session] = useSession()
	const user = session.user.email

	const [prevTag, setPrevTag] = useState(selectedRow) //previous
	const [tag, setTag] = useState(selectedRow as Tag) //current

	/** listener input tag parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('tag-edit-')[1]
		setTag({ ...tag, [key]: event.target.value })
	}

	/** listener tag invalid */
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.currentTarget.innerText
		if (target === '公開中') setTag({ ...tag, invalid: true })
		else setTag({ ...tag, invalid: false })
	}

	/** put tag meta to db */
	const putData = async (changed: Partial<Tag>) => {
		const params: ReqTagPut = {
			PK: tag.PK,
			user,
		}
		Object.keys(changed).map((key) => (params[key] = changed[key]))
		try {
			const res = await axios.put('/tag', params)
			if (res.status != 200) throw new Error('failed to update tag')
			mutate('/tags')
			showTips('タグを更新しました', 'info')
			setPrevTag(tag)
			showSpinner(false)
			handler((value) => !value)
		} catch (err) {
			throw new Error(err)
		}
	}

	/** submit state */
	const handleSubmit = (okCancel: boolean) => {
		if (!okCancel) {
			handler((value) => !value)
			setTag(prevTag)
			return
		}

		const changed = _.omitBy(tag, (v, k) => prevTag[k] == v)
		if (Object.keys(changed).length > 0) {
			showSpinner(true)
			putData(changed)
		} else showTips('あれ、何も変えてないですよね？', 'info')
	}

	/** initialize state */
	useEffect(() => {
		setTag(selectedRow)
		setPrevTag(selectedRow)
	}, [selectedRow])

	return [
		{
			state: tag,
			handleInput: handleChange,
			handleInvalid: handleClick,
			handleSubmit,
		},
	]
}
export default useTagEdit
