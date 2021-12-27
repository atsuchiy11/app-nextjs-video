import * as React from 'react'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { Theme, makeStyles } from '@material-ui/core/styles'
import axios from 'src/foundations/axios'

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
// import LightTooltip from 'src/atoms/LightTooltip'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) => ({
	actionButton: {
		position: 'absolute',
		top: theme.spacing(4),
		right: theme.spacing(1),
	},
}))

interface Props {
	ariaLabel: string
	handler: (e: React.MouseEvent<HTMLButtonElement>) => void
}
/**
 * 難解なアーキテクチャなのでMEMO: スレッド/返信コメントの編集/削除ボタン
 * @param {string} ariaLabel - aria-label属性に入ったスレッドのソートキー
 * @param {function} handler - スレッドを編集モードに切り替えるためのイベントハンドラ。バケツリレー①
 * @returns
 */
const ActionButton: React.FC<Props> = ({ ariaLabel, handler }) => {
	const classes = useStyles()
	const router = useRouter()

	const [open, setOpen] = React.useState(false)
	const handleClose = () => setOpen(!open)

	/** invalid thread */
	const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
		const label = e.currentTarget.getAttribute('aria-label')

		/** スレッドはテキスト置換、返信コメントは無効フラグを立てて非表示にする */
		const updateData = async () => {
			const params = {
				video: `/videos/${router.query.id}`,
				id: label,
				invalid: true,
			}

			try {
				const res = await axios.put('/thread', params)
				if (res.status == 200) {
					console.info('success to update thread')
					mutate(`/thread/${router.query.id}`)
				} else {
					console.warn('failed to update thread')
				}
			} catch (err) {
				console.error(err)
			}
		}
		updateData()
	}

	return (
		<ListItemSecondaryAction className={classes.actionButton}>
			<IconButton edge="end" aria-label={ariaLabel} onClick={handler}>
				<EditIcon fontSize="small" />
			</IconButton>
			{/* <LightTooltip title="削除すると戻せません"> */}
			<IconButton edge="end" onClick={handleClose}>
				<DeleteIcon fontSize="small" />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>えっ、削除するんですか？</DialogTitle>
				<DialogContent>
					<DialogContentText>
						返信コメントも削除されます。いいんですね？
					</DialogContentText>
					<DialogActions>
						<Button
							aria-label="cancel-delete"
							onClick={handleClose}
							color="primary">
							Cancel
						</Button>
						<Button
							aria-label={ariaLabel}
							onClick={handleRemove}
							color="primary">
							OK
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
			{/* </LightTooltip> */}
		</ListItemSecondaryAction>
	)
}
export default ActionButton
