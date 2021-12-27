import * as React from 'react'
import useStyles from 'src/styles/datagrid'
import dataGridjaJP from 'src/foundations/dataGridjaJP'
import { DataGrid } from '@material-ui/data-grid'
import TableToolbar, {
	FilterIcon,
	ColumnIcon,
} from 'src/components/video/TableToolbar'
import { columns, imageColumnHeight as height } from 'src/data/videoData'
import { VideoTableRow } from 'src/interfaces/api'
import { useVideoTable } from 'src/foundations/hooks'

import VideoFab from 'src/components/video/VideoFab'
import useDataGrid from 'src/components/video/useDataGrid'

const VideoManageTable: React.FC = () => {
	const classes = useStyles()
	const [tableProps, rowProps, pageProps, search] =
		useDataGrid<VideoTableRow>(useVideoTable)

	/** validate */
	if (tableProps.error) return <div>failed to load table data.</div>
	if (!tableProps.rows) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<VideoFab selectedRow={rowProps.selected as VideoTableRow} />
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
				onRowClick={rowProps.onChange}
				rowHeight={height}
				componentsProps={{
					toolbar: {
						value: search.text,
						onChange: (event) => search.request(event.target.value),
						clearSearch: () => search.request(''),
					},
				}}
			/>
		</div>
	)
}
export default VideoManageTable
