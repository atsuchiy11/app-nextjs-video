import React, { useState, useEffect } from 'react'
import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useSession } from 'next-auth/client'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { useTips } from 'src/atoms/Tips'
import { useSpinner } from 'src/atoms/Spinner'
import { ReqTagDelete, Tag } from 'src/interfaces/api'

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
	selectedRow: Tag
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const TagDeleteDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { selectedRow, open, handler } = props
	const [session] = useSession()

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
		/** remove tag */
		const deleteData = async () => {
			const params: ReqTagDelete = {
				PK: selectedRow.PK,
				user: session.user.email,
			}
			try {
				const res = await axios.delete('/tag', { data: params })
				if (res.status != 200) throw new Error('failed to update path.')
				mutate('/tags')
				showTips('タグを削除しました', 'info')
				showSpinner(false)
				handler((value) => !value)
			} catch (err) {
				throw new Error(err)
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
				タグ「{selectedRow.name}」を削除します
			</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ fontWeight: 'bold', color: 'red' }}>
					【非推奨】削除はお勧めしません
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					ユーザに見せたくないだけなら、非公開にしてください。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					基本的に、誤って作成したときのために提供している機能です。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					多数の動画に関連づけられている場合は、よく考えてからご利用ください。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					動画の関連情報は全て削除され、元に戻せません。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					※利用状況によっては廃止します。慎重にご利用ください。
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
export default TagDeleteDialog
