import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Theme, makeStyles } from '@material-ui/core/styles'
import usePathCreate from 'src/components/path/usePathCreate'

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

const PathCreateDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { open, handler } = props

	const [rowProps, validate] = usePathCreate(handler)

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
			<DialogTitle id="path-create-title">再生リストの登録</DialogTitle>
			<DialogContent>
				<Grid
					container
					justify="center"
					alignItems="center"
					direction="column">
					<TextField
						id="path-create-name"
						label="再生リスト名"
						color="primary"
						variant="outlined"
						required
						value={rowProps.state.name ? rowProps.state.name : ''}
						onChange={rowProps.handleInput}
						error={validate.title}
						style={{ width: '100%' }}
						className={classes.margin}
					/>
					<TextField
						id="path-create-description"
						label="概要"
						color="primary"
						variant="outlined"
						required
						value={
							rowProps.state.description
								? rowProps.state.description
								: ''
						}
						onChange={rowProps.handleInput}
						multiline
						rows={2}
						error={validate.description}
						style={{ width: '100%' }}
						className={classes.margin}
					/>
					<TextField
						id="path-create-note"
						label="備考"
						placeholder="管理用のメモです。ユーザには表示されません。。"
						color="primary"
						variant="outlined"
						value={rowProps.state.note ? rowProps.state.note : ''}
						onChange={rowProps.handleInput}
						style={{ width: '100%' }}
						className={classes.margin}
					/>
				</Grid>
			</DialogContent>
			<DialogActions className={classes.margin}>
				<Button
					onClick={() => rowProps.handleSubmit(false)}
					color="primary">
					キャンセル
				</Button>
				<Button
					onClick={() => rowProps.handleSubmit(true)}
					color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default PathCreateDialog
