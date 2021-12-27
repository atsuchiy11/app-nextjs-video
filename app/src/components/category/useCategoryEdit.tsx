import _ from 'lodash'
import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useTips } from 'src/atoms/Tips'
import { useSpinner } from 'src/atoms/Spinner'
import { Category, ReqCategoryPut } from 'src/interfaces/api'
import { useCategories } from 'src/foundations/hooks'

/**
 * カテゴリ編集のメタデータを管理するフック
 * @param selectedRow selected category meta data
 * @param handler handler for notice parent component
 * @returns
 */
const useCategoryEdit = (
	selectedRow: Category,
	handler: (value: React.SetStateAction<boolean>) => void
) => {
	const { showTips } = useTips()
	const { showSpinner } = useSpinner()

	const [session] = useSession()
	const user = session.user.email

	const { data: categories, error: categoryError } = useCategories()

	const [error, setError] = useState(true)
	const [prevCategory, setPrevCategory] = useState(selectedRow)
	const [category, setCategory] = useState(selectedRow as Category)

	/** listener input category parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('category-edit-')[1]
		setCategory({ ...category, [key]: event.target.value })
	}

	/** listener primary category */
	const handleChangePrimary = (event: React.ChangeEvent<HTMLInputElement>) =>
		setCategory({ ...category, parent: event.target.value })

	/** listener category invalid */
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.currentTarget.innerText
		if (target === '公開中') setCategory({ ...category, invalid: true })
		else setCategory({ ...category, invalid: false })
	}

	/** put category meta data to db */
	const putData = async (changed: Partial<Category>) => {
		const params: ReqCategoryPut = {
			PK: category.PK,
			user,
		}
		Object.keys(changed).map((key) => {
			switch (key) {
				case 'parent':
					params['parentId'] = categories.find(
						(c) => c.name == category.parent
					).PK
					break
				default:
					params[key] = changed[key]
					break
			}
		})
		try {
			const res = await axios.put('/category', params)
			if (res.status != 200) throw new Error('failed to update category')
			mutate('/categories')
			showTips('カテゴリを更新しました', 'info')
			setPrevCategory(category)
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
			setCategory(prevCategory)
			return
		}
		const changed = _.omitBy(category, (v, k) => prevCategory[k] == v)
		if (Object.keys(changed).length > 0) {
			showSpinner(true)
			putData(changed)
		} else showTips('あれ、何も変えてないですよね？', 'info')
	}

	/** validate */
	useEffect(() => {
		if (categoryError) setError(true)
		else setError(false)
	}, [categoryError])

	/** initialize */
	useEffect(() => {
		setCategory(selectedRow)
		setPrevCategory(selectedRow)
	}, [selectedRow])

	return [
		{
			state: category,
			error,
			handleInput: handleChange,
			handlePrimary: handleChangePrimary,
			handleInvalid: handleClick,
			handleSubmit,
		},
	]
}
export default useCategoryEdit
