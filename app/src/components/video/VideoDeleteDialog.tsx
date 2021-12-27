import React, { useState, useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

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
	text: {},
}))

interface Props {
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const VideoDeleteDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { open, handler } = props

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)

	/** submit state */
	const handleClose = (okCancel: boolean) => {
		if (okCancel) {
			handler((value) => !value)
		} else {
			handler((value) => !value)
		}
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
				【システム管理者から】利用状況に応じて実装します
			</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					ユーザに視聴させたくない場合は、非公開にしてください。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					不正な動画を見つけた場合や、誤って動画を投稿してしまった場合は
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					システム管理者に問い合わせてください。
				</DialogContentText>
			</DialogContent>
			<DialogActions className={classes.margin}>
				<Button onClick={() => handleClose(false)} color="primary">
					キャンセル
				</Button>
				<Button onClick={() => handleClose(true)} color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default VideoDeleteDialog
