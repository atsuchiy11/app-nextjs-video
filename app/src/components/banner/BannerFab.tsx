import React, { useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Banner } from 'src/interfaces/api'
import { useTips } from 'src/atoms/Tips'

import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import BannerCreateDialog from 'src/components/banner/BannerCreateDialog'
import BannerEditDialog from 'src/components/banner/BannerEditDialog'
import BannerDeleteDialog from './BannerDeleteDialog'

const useStyles = makeStyles((theme: Theme) => ({
	fab: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))

interface Props {
	selectedRow: Banner
}

const BannerFab: React.FC<Props> = ({ selectedRow }) => {
	const classes = useStyles()
	const { showTips } = useTips()

	/** create dialog state */
	const [openCreateDialog, setOpenCreateDialog] = useState(false)
	const handleClickCreate = () => {
		setOpenCreateDialog(!openCreateDialog)
	}

	/** edit dialog state */
	const [openEditDialog, setOpenEditDialog] = useState(false)
	const handleClickEdit = () => {
		if (!selectedRow.id) {
			showTips('バナーを選択してください', 'info')
			return
		}
		setOpenEditDialog(!openEditDialog)
	}

	/** delete dialog state */
	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
	const handleClickDelete = () => {
		if (!selectedRow.id) {
			showTips('バナーを選択してください', 'info')
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
			<BannerCreateDialog
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
			<BannerEditDialog
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
			<BannerDeleteDialog
				selectedRow={selectedRow}
				open={openDeleteDialog}
				handler={setOpenDeleteDialog}
			/>
		</Box>
	)
}
export default BannerFab
