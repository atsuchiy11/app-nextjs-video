import React, { useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import VideoAppendDialog from 'src/components/path/VideoAppendDialog'
import DnDList from 'src/components/path/DnDList'
import usePathEdit from 'src/components/path/usePathEdit'

const useStyles = makeStyles((theme: Theme) => ({
	box: {
		'& > *': {
			marginBottom: theme.spacing(2),
		},
	},
	button: {
		marginBottom: theme.spacing(4),
	},
}))

const PathDetail: React.FC = () => {
	const classes = useStyles()

	/** load state */
	const [pathProps] = usePathEdit()

	/** create dialog state */
	const [openCreateDialog, setOpenCreateDialog] = useState(false)

	/** validate */
	if (pathProps.error) return <div>failed to load paths.</div>
	if (!pathProps.state) return <div>loading...</div>

	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				className={classes.button}>
				<Button
					id="path-edit-invalid"
					variant="contained"
					color={pathProps.state.invalid ? 'default' : 'primary'}
					onClick={pathProps.handleInvalid}>
					{pathProps.state.invalid ? '非公開' : '公開中'}
				</Button>
				<Box display="flex">
					<Button
						variant="outlined"
						color="primary"
						onClick={() => setOpenCreateDialog(!openCreateDialog)}
						style={{ marginLeft: '8px' }}>
						動画の追加
					</Button>
					<VideoAppendDialog
						path={pathProps.state}
						setPath={pathProps.setState}
						open={openCreateDialog}
						handler={setOpenCreateDialog}
					/>
					<Button
						variant="outlined"
						color="secondary"
						onClick={pathProps.handleSubmit}
						style={{ marginLeft: '8px' }}>
						設定完了
					</Button>
				</Box>
			</Box>
			<Box display="flex" flexDirection="column" className={classes.box}>
				<TextField
					id="path-edit-name"
					label="再生リスト名"
					color="primary"
					variant="outlined"
					value={pathProps.state.name ? pathProps.state.name : ''}
					onChange={pathProps.handleInput}
					style={{ width: '80%' }}
				/>
				<TextField
					id="path-edit-description"
					label="概要"
					color="primary"
					variant="outlined"
					value={
						pathProps.state.description
							? pathProps.state.description
							: ''
					}
					multiline
					rows={2}
					onChange={pathProps.handleInput}
				/>
				<TextField
					id="path-edit-note"
					label="備考"
					color="primary"
					variant="outlined"
					value={pathProps.state.note ? pathProps.state.note : ''}
					onChange={pathProps.handleInput}
				/>
			</Box>
			<DnDList
				path={pathProps.state}
				setPath={pathProps.setState}
				onDrop={pathProps.onDrop}
			/>
		</>
	)
}
export default PathDetail
