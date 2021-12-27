import * as React from 'react'
import useStyles from 'src/styles/datagrid'
import { DataGrid } from '@material-ui/data-grid'
import TableToolbar, {
	FilterIcon,
	ColumnIcon,
} from 'src/components/video/TableToolbar'
import dataGridjaJP from 'src/foundations/dataGridjaJP'
import PathFab from 'src/components/path/PathFab'
import { columns } from 'src/data/pathData'
import { Path } from 'src/interfaces/api'
import useDataGrid from 'src/components/video/useDataGrid'
import { usePaths } from 'src/foundations/hooks'

const PathManageTable: React.FC = () => {
	const classes = useStyles()

	const [tableProps, rowProps, pageProps, search] =
		useDataGrid<Path>(usePaths)

	/** validate */
	if (tableProps.error) return <div>failed to load table data.</div>
	if (!tableProps.rows) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<PathFab selectedRow={rowProps.selected as Path} />
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
export default PathManageTable
