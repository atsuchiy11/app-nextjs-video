import React, { useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { VideoTableRow } from 'src/interfaces/api'
import { useTips } from 'src/atoms/Tips'

import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import VideoCreateDialog from 'src/components/video/VideoCreateDialog'
import VideoEditDialog from 'src/components/video/VideoEditDialog'
import VideoDeleteDialog from 'src/components/video/VideoDeleteDialog'

const useStyles = makeStyles((theme: Theme) => ({
	fab: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))

interface Props {
	selectedRow: VideoTableRow
}
const VideoFab: React.FC<Props> = ({ selectedRow }) => {
	const classes = useStyles()
	const { showTips } = useTips()

	/** create dialog state */
	const [openCreateDialog, setOpenCreateDialog] = useState(false)
	const handleClickCreate = () => setOpenCreateDialog(!openCreateDialog)

	/** edit dialog state */
	const [openEditDialog, setOpenEditDialog] = useState(false)
	const handleClickEdit = () => {
		let message = null
		let serverity = null
		if (!selectedRow.id) {
			message = '編集したい動画を選びましょう！'
			serverity = 'info'
		} else if (!selectedRow.match) {
			message = 'とりあえずシステム管理者に聞いてみましょうか。'
			serverity = 'error'
		}
		if (message) {
			showTips(message, serverity)
			return
		}
		setOpenEditDialog(!openEditDialog)
	}

	/** delete dialog state */
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const handleClickDelete = () => {
		if (!selectedRow.id) {
			showTips('削除したい動画を選びましょう！', 'info')
			return
		}
		setOpenDeleteDialog(!openDeleteDialog)
	}

	return (
		<Box display="flex" justifyContent="flex-end" className={classes.fab}>
			<Fab
				color="primary"
				aria-label="create"
				size="small"
				onClick={handleClickCreate}>
				<AddIcon />
			</Fab>
			<VideoCreateDialog
				open={openCreateDialog}
				handler={setOpenCreateDialog}
			/>
			<Fab
				color="secondary"
				arid-label="edit"
				size="small"
				onClick={handleClickEdit}>
				<EditIcon />
			</Fab>
			<VideoEditDialog
				selectedRow={selectedRow}
				open={openEditDialog}
				handler={setOpenEditDialog}
			/>
			<Fab
				color="default"
				arid-label="edit"
				size="small"
				onClick={handleClickDelete}>
				<DeleteIcon />
			</Fab>
			<VideoDeleteDialog
				// selectedRow={selectedRow}
				open={openDeleteDialog}
				handler={setOpenDeleteDialog}
			/>
		</Box>
	)
}
export default VideoFab
