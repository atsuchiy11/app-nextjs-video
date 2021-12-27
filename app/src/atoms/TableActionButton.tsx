import * as React from 'react'

export const Garbage = () => {
	return <div>おそらくボツ</div>
}
// import * as React from 'react'
// import { Theme, makeStyles } from '@material-ui/core/styles'
// import { GridRowData } from '@material-ui/data-grid'

// import Fab from '@material-ui/core/Fab'
// import AddIcon from '@material-ui/icons/Add'
// import EditIcon from '@material-ui/icons/Edit'
// import DeleteIcon from '@material-ui/icons/Delete'
// import Notification from 'src/atoms/Notification'
// import VideoCreateDialog from 'src/components/video/VideoCreateDialog'
// import VideoEditDialog from 'src/components/video/VideoEditDialog'

// const useStyles = makeStyles((theme: Theme) => ({
// 	fab: {
// 		'& > *': {
// 			margin: theme.spacing(1),
// 		},
// 		display: 'flex',
// 		justifyContent: 'flex-end',
// 	},
// }))

// interface Props {
// 	row: GridRowData
// }

// const TableActionButton: React.FC<Props> = ({ row }) => {
// 	const classes = useStyles()
// 	const [openCreateDialog, setOpenCreateDialog] = React.useState(false)
// 	const handleClickCreate = () => {
// 		setOpenCreateDialog(!openCreateDialog)
// 	}

// 	/**これで１セット（配列で一元管理したい） */
// 	const [openEditDialog, setOpenEditDialog] = React.useState(false)
// 	const [openEditAlert, setOpenEditAlert] = React.useState(false)
// 	const handleClickEdit = () => {
// 		if (!row.tag) {
// 			setOpenEditAlert(true)
// 		} else {
// 			setOpenEditDialog(!openEditDialog)
// 		}
// 	}

// 	return (
// 		<div className={classes.fab}>
// 			<Fab
// 				color="primary"
// 				aria-label="create"
// 				size="small"
// 				onClick={handleClickCreate}>
// 				<AddIcon />
// 			</Fab>
// 			<VideoCreateDialog
// 				open={openCreateDialog}
// 				handler={handleClickCreate}
// 			/>
// 			<Fab
// 				color="secondary"
// 				arid-label="edit"
// 				size="small"
// 				onClick={handleClickEdit}>
// 				<EditIcon />
// 				<Notification
// 					open={openEditAlert}
// 					handler={setOpenEditAlert}
// 					message="動画コンテンツを選択してください！"
// 					severity="info"
// 				/>
// 			</Fab>
// 			<VideoEditDialog
// 				row={row}
// 				open={openEditDialog}
// 				handler={handleClickEdit}
// 			/>
// 			<Fab color="default" arid-label="edit" size="small">
// 				<DeleteIcon />
// 			</Fab>
// 		</div>
// 	)
// }
// export default TableActionButton
