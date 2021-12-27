import React, { useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { useTips } from 'src/atoms/Tips'
import { Path } from 'src/interfaces/api'

import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PathCreateDialog from 'src/components/path/PathCreateDialog'
import PathDeleteDialog from 'src/components/path/PathDeleteDialog'

const useStyles = makeStyles((theme: Theme) => ({
	fab: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))

interface Props {
	selectedRow: Path
}

const PathFab: React.FC<Props> = ({ selectedRow }) => {
	const classes = useStyles()
	const router = useRouter()
	const { showTips } = useTips()

	/** create dialog state */
	const [openCreateDialog, setOpenCreateDialog] = useState(false)

	/** edit dialog state */
	const handleClickEdit = (event) => {
		if (!selectedRow.id && selectedRow.id != 0) {
			// id=0のとき
			showTips('再生リストを選択してください。', 'info')
			return
		}
		event.preventDefault()
		router.push(`/admin/playlist/${selectedRow.PK}`)
	}

	/** delete dialog state */
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const handleClickDelete = () => {
		if (!selectedRow.id && selectedRow.id != 0) {
			// id=0のとき
			showTips('再生リストを選択してください。', 'info')
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
			<PathCreateDialog
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
			<Fab
				color="default"
				arid-label="edit"
				size="small"
				onClick={handleClickDelete}>
				<DeleteIcon />
			</Fab>
			<PathDeleteDialog
				selectedRow={selectedRow}
				open={openDeleteDialog}
				handler={setOpenDeleteDialog}
			/>
		</Box>
	)
}
export default PathFab
