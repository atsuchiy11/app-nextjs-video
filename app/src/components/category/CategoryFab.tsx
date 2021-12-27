import React, { useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { useAppContext, Severity } from 'src/foundations/AppProvider'
import { Category } from 'src/interfaces/api'

import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CategoryCreateDialog from 'src/components/category/CategoryCreateDialog'
import CategoryEditDialog from 'src/components/category/CategoryEditDialog'
import CategoryDeleteDialog from 'src/components/category/CategoryDeleteDialog'

const useStyles = makeStyles((theme: Theme) => ({
	fab: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))

interface Props {
	selectedRow: Category
}

const CategoryFab: React.FC<Props> = ({ selectedRow }) => {
	const classes = useStyles()
	const { state, dispatch } = useAppContext()

	/** notification */
	const notification = (message: string, severity: Severity) => {
		dispatch({
			openAlert: {
				payload: {
					open: !state.openAlert.open,
					message,
					severity,
				},
			},
		})
	}

	/** create dialog state */
	const [openCreateDialog, setOpenCreateDialog] = useState(false)

	/** edit dialog state */
	const [openEditDialog, setOpenEditDialog] = useState(false)
	const handleClickEdit = () => {
		let message = ''
		if (!selectedRow.id) {
			message = 'カテゴリを選択してください'
		} else if (!selectedRow.parent) {
			message = '親カテゴリは変更できません！'
		}
		if (message) {
			notification(message, 'info')
			return
		}
		setOpenEditDialog(!openEditDialog)
	}

	/** delete dialog state */
	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
	const handleClickDelete = () => {
		let message = ''
		if (!selectedRow.id) {
			message = 'カテゴリを選択してください'
		} else if (!selectedRow.parent) {
			message = '親カテゴリは変更できません！'
		}
		if (message) {
			notification(message, 'info')
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
			<CategoryCreateDialog
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
			<CategoryEditDialog
				selectedRow={selectedRow}
				open={openEditDialog}
				handler={setOpenEditDialog}
			/>
			<Fab
				color="default"
				arid-label="delete"
				size="small"
				onClick={handleClickDelete}>
				<DeleteIcon />
			</Fab>
			<CategoryDeleteDialog
				selectedRow={selectedRow}
				open={openDeleteDialog}
				handler={setOpenDeleteDialog}
			/>
		</Box>
	)
}
export default CategoryFab
