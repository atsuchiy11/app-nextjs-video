import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import useStyles from 'src/styles/videoAppendDialog'
import { useTips } from 'src/atoms/Tips'
// import useSWR, { mutate } from 'swr'
// import {mutate} from 'swr'
// import { useRouter } from 'next/router'
// import { getPath, getVideoRows } from 'src/data/fetcher'
import { Path, VideoTableRow } from 'src/interfaces/api'
// import { useAppContext } from 'src/foundations/AppProvider'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'

import { DataGrid, GridRowParams } from '@material-ui/data-grid'
import TableToolbar, {
	FilterIcon,
	ColumnIcon,
} from 'src/components/video/TableToolbar'
import dataGridjaJP from 'src/foundations/dataGridjaJP'
import { columns, _height } from 'src/data/videoData'

import useDataGrid from 'src/components/video/useDataGrid'
import { useVideoTable } from 'src/foundations/hooks'

interface Props {
	path: Path
	setPath: React.Dispatch<React.SetStateAction<Path>>
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const VideoAppendDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { path, setPath, open, handler } = props
	const { showTips } = useTips()

	/** load state */
	const [tableProps, rowProps, pageProps, search] =
		useDataGrid<VideoTableRow>(useVideoTable)

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)
	const handleClose = () => {
		// setChecked([])
		rowProps.resetCheck([])
		handler((value) => !value)
	}

	/** submit state */
	const handleSubmit = () => {
		let duplicate_err = false
		const newPath = _.cloneDeep(path)
		// checked.map((id) => {
		rowProps.checked.map((id) => {
			const videoRow = tableProps.rows.find((v) => v.id == id)
			const duplicated = newPath.videos.find(
				(path) => path.uri == videoRow.uri
			)
			if (duplicated) duplicate_err = true
			newPath.videos.push({
				uri: videoRow.uri,
				order: newPath.videos.length + 1,
			})
		})
		if (!duplicate_err) {
			setPath(newPath)
			handler((value) => !value)
		} else {
			showTips('動画が重複しています！', 'info')
		}
	}

	/** Parsent state wather */
	useEffect(() => setOpenDialog(open), [open])

	/** validate */
	if (tableProps.error) return <div>failed to load table data.</div>
	if (!tableProps.rows) return <div>loading...</div>

	return (
		<Dialog fullScreen open={openDialog} onClose={handleClose}>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}>
						<CloseIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						ラーニングパスへの動画コンテンツの追加
					</Typography>
					<Button
						autoFocus
						variant="outlined"
						color="inherit"
						onClick={handleSubmit}>
						追加
					</Button>
				</Toolbar>
			</AppBar>
			<DialogContent className={classes.root}>
				{/* <div>{JSON.stringify(selected)}</div> */}
				<DataGrid
					className={classes.datagrid}
					localeText={dataGridjaJP}
					components={{
						Toolbar: TableToolbar,
						OpenFilterButtonIcon: FilterIcon,
						ColumnSelectorIcon: ColumnIcon,
					}}
					rows={search.rows}
					columns={columns}
					pageSize={pageProps.size}
					onPageSizeChange={pageProps.onChange}
					rowsPerPageOptions={[10, 20, 50]}
					autoHeight
					rowHeight={_height}
					componentsProps={{
						toolbar: {
							value: search.text,
							onChange: (event) =>
								search.request(event.target.value),
							clearSearch: () => search.request(''),
						},
					}}
					checkboxSelection
					isRowSelectable={(params: GridRowParams) =>
						!params.row.invalid && params.row.match
					}
					onSelectionModelChange={(params) =>
						rowProps.onSelect(params)
					}
				/>
			</DialogContent>
		</Dialog>
	)
}
export default VideoAppendDialog
