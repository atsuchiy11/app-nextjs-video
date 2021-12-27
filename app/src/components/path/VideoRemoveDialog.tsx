import * as React from 'react'
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
}))

interface Props {
	pathName: string
	videoName: string
	open: boolean
	handler: (okCancel: boolean) => void
}

const VideoRemoveDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { pathName, videoName, open, handler } = props
	const [openDialog, setOpenDialog] = React.useState(open)

	/** Parent state watcher */
	React.useEffect(() => setOpenDialog(open), [open])

	return (
		<Dialog fullWidth maxWidth="sm" open={openDialog} onClose={handler}>
			<DialogTitle id="tag-edit-title">
				再生リスト「{pathName}」
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					動画「{videoName}」をリストから削除します。
				</DialogContentText>
			</DialogContent>
			<DialogActions className={classes.margin}>
				<Button onClick={() => handler(false)} color="primary">
					キャンセル
				</Button>
				<Button onClick={() => handler(true)} color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default VideoRemoveDialog
