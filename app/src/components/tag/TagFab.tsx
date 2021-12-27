import React, { useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Tag } from 'src/interfaces/api'
import { useTips } from 'src/atoms/Tips'

import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TagEditDialog from 'src/components/tag/TagEditDialog'
import TagCreateDialog from 'src/components/tag/TagCreateDialog'
import TagDeleteDialog from 'src/components/tag/TagDeleteDialog'

const useStyles = makeStyles((theme: Theme) => ({
	fab: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))

interface Props {
	selectedRow: Tag
}

const TagFab: React.FC<Props> = ({ selectedRow }) => {
	const classes = useStyles()
	const { showTips } = useTips()

	/** create dialog state */
	const [openCreateDialog, setOpenCreateDialog] = useState(false)

	/** edit dialog state */
	const [openEditDialog, setOpenEditDialog] = useState(false)
	const handleClickEdit = () => {
		if (!selectedRow.id) {
			showTips('タグを選択してください', 'info')
			return
		}
		setOpenEditDialog(!openEditDialog)
	}

	/** delete dialog state */
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const handleClickDelete = () => {
		if (!selectedRow.id) {
			showTips('タグを選択してください', 'info')
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
				onClick={() => setOpenCreateDialog(!openCreateDialog)}>
				<AddIcon />
			</Fab>
			<TagCreateDialog
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
			<TagEditDialog
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
			<TagDeleteDialog
				selectedRow={selectedRow}
				open={openDeleteDialog}
				handler={setOpenDeleteDialog}
			/>
		</Box>
	)
}
export default TagFab
