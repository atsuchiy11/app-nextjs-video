import React, { useState, useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Banner } from 'src/interfaces/api'

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
	selectedRow: Banner
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const BannerDeleteDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { open, handler } = props

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)

	/** submit state */
	const handleClose = (okCancel: boolean) => {
		if (!okCancel) {
			handler((value) => !value)
			return
		}
		handler((value) => !value)
	}
	/** Parent state watcher */
	useEffect(() => setOpenDialog(open), [open])

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={openDialog}
			onClose={() => handler((value) => !value)}>
			<DialogTitle>需要がなさそう。。</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					当面は既存のバナーを使い回してください。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					複数バナーを管理する必要性が出てきたら実装します。
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
export default BannerDeleteDialog
