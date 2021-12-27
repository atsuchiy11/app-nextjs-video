import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useTips, Severity } from 'src/atoms/Tips'
import { useSpinner } from 'src/atoms/Spinner'
import { Category, ReqCategoryPost } from 'src/interfaces/api'
import { useCategories } from 'src/foundations/hooks'

/**
 * カテゴリ登録のメタデータを管理するフック
 * @param handler handler for notice parent component
 * @returns
 */
const useCategoryCreate = (
	handler: (value: React.SetStateAction<boolean>) => void
) => {
	const { showTips } = useTips()
	const { showSpinner } = useSpinner()

	const [session] = useSession()
	const user = session.user.email

	const { data: categories, error: categoryError } = useCategories()

	const [error, setError] = useState(true)
	const [category, setCategory] = useState({} as Category)
	const [titleErr, setTitleErr] = useState(false)
	const [descriptionErr, setDescriptionErr] = useState(false)
	const [parentErr, setParentErr] = useState(false)

	/** listener input category parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('category-create-')[1]
		setCategory({ ...category, [key]: event.target.value })
		/** error cancel */
		if (key == 'name' && event.target.value != '') setTitleErr(false)
		if (key == 'description' && event.target.value != '')
			setDescriptionErr(false)
	}

	/** listener primary category */
	const handleChangePrimary = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCategory({ ...category, parent: event.target.value })
		if (event.target.value !== '') setParentErr(false)
	}

	/** validate category meta data */
	const validateParams = (): { message: string; severity: Severity } => {
		if (!category.name || category.name == '') {
			setTitleErr(true)
			return {
				message: '名前はさすがに必要でしょ。。',
				severity: 'info',
			}
		}
		if (!category.parent || category.parent == '') {
			setParentErr(true)
			return {
				message:
					'親カテゴリは必須です。親カテゴリを作りたい場合はシステム管理者に問い合わせてください。',
				severity: 'info',
			}
		}
		if (!category.description || category.description == '') {
			setDescriptionErr(true)
			return {
				message: '秩序のため必須でお願いします。',
				severity: 'info',
			}
		}
		return null
	}

	/** post category meta data to db */
	const postData = async () => {
		const parent = categories.find((c) => c.name == category.parent)
		const params: ReqCategoryPost = {
			name: category.name,
			user,
			description: category.description,
			parentId: parent.PK,
		}
		if ('note' in category) params['note'] = category.note

		try {
			const res = await axios.post('/category', params)
			if (res.status != 200) throw new Error('faield to update category')
			mutate('/categories')
			showTips('カテゴリを登録しました', 'info')
			setCategory({} as Category)
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
			setCategory({} as Category)
			return
		}
		/** validate */
		const isError = validateParams()
		if (isError) {
			showTips(isError.message, isError.severity)
			return
		}
		showSpinner(true)
		postData()
	}

	/** validate */
	useEffect(() => {
		if (categoryError) setError(true)
		else setError(false)
	}, [categoryError])

	return [
		{
			state: category,
			error,
			handleInput: handleChange,
			handleParent: handleChangePrimary,
			handleSubmit,
		},
		{
			title: titleErr,
			parent: parentErr,
			description: descriptionErr,
		},
	]
}
export default useCategoryCreate
