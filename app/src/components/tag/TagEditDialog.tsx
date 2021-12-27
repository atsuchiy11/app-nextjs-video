import React, { useState, useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Tag } from 'src/interfaces/api'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useTagEdit from './useTagEdit'

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

const TagEditDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { selectedRow, open, handler } = props

	const [tagProps] = useTagEdit(selectedRow, handler)

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)

	/** Parent state watcher */
	useEffect(() => setOpenDialog(open), [open])

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={openDialog}
			onClose={() => handler((value) => !value)}>
			<DialogTitle id="tag-edit-title">
				<Grid
					container
					className={classes.margin}
					justify="space-between"
					alignItems="center">
					タグの編集
					<Button
						id="tag-edit-invalid"
						variant="contained"
						color={tagProps.state.invalid ? 'default' : 'primary'}
						onClick={tagProps.handleInvalid}>
						{tagProps.state.invalid ? '非公開' : '公開中'}
					</Button>
				</Grid>
			</DialogTitle>
			<DialogContent>
				<Grid
					container
					justify="center"
					alignItems="center"
					direction="column">
					<TextField
						id="tag-edit-name"
						label="タグ名"
						color="primary"
						variant="outlined"
						value={tagProps.state.name ? tagProps.state.name : ''}
						onChange={tagProps.handleInput}
						style={{ width: '100%' }}
						className={classes.margin}
					/>
					<TextField
						id="tag-edit-description"
						label="メモ（備考）"
						color="primary"
						variant="outlined"
						value={
							tagProps.state.description
								? tagProps.state.description
								: ''
						}
						onChange={tagProps.handleInput}
						multiline
						rows={2}
						style={{ width: 'inherit' }}
						className={classes.margin}
					/>
				</Grid>
			</DialogContent>
			<DialogActions className={classes.margin}>
				<Button
					onClick={() => tagProps.handleSubmit(false)}
					color="primary">
					キャンセル
				</Button>
				<Button
					onClick={() => tagProps.handleSubmit(true)}
					color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default TagEditDialog
