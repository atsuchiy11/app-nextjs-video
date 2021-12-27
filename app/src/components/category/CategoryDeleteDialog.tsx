import React, { useState, useEffect } from 'react'
import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useTips } from 'src/atoms/Tips'
import { useSpinner } from 'src/atoms/Spinner'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Category } from 'src/interfaces/api'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles((theme: Theme) => ({
	margin: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))

interface Props {
	selectedRow: Category
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const CategoryDeleteDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { selectedRow, open, handler } = props
	const { showTips } = useTips()
	const { showSpinner } = useSpinner()

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)

	/** submit state */
	const handleSubmit = (okCancel: boolean) => {
		if (!okCancel) {
			handler((value) => !value)
			return
		}

		/** can't delete category related to videos */
		const getVideos = async (categoryId: string) => {
			try {
				const res = await axios.get(`/videos/${categoryId}`)
				if (res.status != 200) throw new Error('failed to get videos.')
				if (!res.data || res.data.length <= 0)
					return Promise.resolve(true)
				else return Promise.resolve(false)
			} catch (err) {
				throw new Error(err)
			}
		}
		/** remove category meta */
		const deleteCategory = async (categoryId: string) => {
			try {
				const res = await axios.delete(`/category/${categoryId}`)
				if (res.status != 200)
					throw new Error('failed to remove category.')
				return Promise.resolve(true)
			} catch (err) {
				throw new Error(err)
			}
		}

		const deleteData = async () => {
			// サーバ側で判定してもいいかも。。
			const not_found = await getVideos(selectedRow.PK)
			if (!not_found) {
				showTips(
					'このカテゴリに関連付けられている動画があります。',
					'warning'
				)
				showSpinner(false)
				handler((value) => !value)
				return
			}
			const res = await deleteCategory(selectedRow.PK)
			if (res) {
				mutate('/categories')
				showTips('カテゴリを削除しました。', 'info')
				showSpinner(false)
				handler((value) => !value)
			}
		}
		showSpinner(true)
		deleteData()
	}

	/** Parent state watcher */
	useEffect(() => setOpenDialog(open), [open])

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={openDialog}
			onClose={() => handler((value) => !value)}>
			<DialogTitle id="tag-delete-title">
				カテゴリ「{selectedRow.name}」を削除します
			</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ fontWeight: 'bold', color: 'red' }}>
					【非推奨】削除はお勧めしません
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					カテゴリは、動画コンテンツの必須項目となります。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					カテゴリにいずれかの動画コンテンツが関連付けられている場合、
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					そのカテゴリを削除することはできません。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					削除する場合は、動画コンテンツの関連付けを全て解除してください。
				</DialogContentText>
			</DialogContent>
			<DialogActions className={classes.margin}>
				<Button onClick={() => handleSubmit(false)} color="primary">
					キャンセル
				</Button>
				<Button onClick={() => handleSubmit(true)} color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default CategoryDeleteDialog
