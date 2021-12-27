import React, { useState, useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import useTagCreate from 'src/components/tag/useTagCreate'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles((theme: Theme) => ({
	margin: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))

interface Props {
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const TagCreateDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { open, handler } = props

	/** load state */
	const [tagProps] = useTagCreate(handler)

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
			<DialogTitle id="tag-create-title">タグの登録</DialogTitle>
			<DialogContent>
				<Grid
					container
					justify="center"
					alignItems="center"
					direction="column">
					<Grid container justify="center" alignItems="center">
						<TextField
							id="tag-create-name"
							label="タグ名"
							color="primary"
							variant="outlined"
							value={
								tagProps.state.name ? tagProps.state.name : ''
							}
							onChange={tagProps.handleInput}
							error={tagProps.error}
							style={{ width: '100%' }}
							className={classes.margin}
							required
						/>
					</Grid>
					<TextField
						id="tag-create-description"
						label="備考"
						color="primary"
						variant="outlined"
						value={
							tagProps.state.description
								? tagProps.state.description
								: ''
						}
						placeholder="管理画面上のツールチップに表示されます"
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
export default TagCreateDialog
