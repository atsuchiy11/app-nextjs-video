import * as React from 'react'
import useStyles from 'src/styles/datagrid'
import { DataGrid } from '@material-ui/data-grid'
import TableToolbar, {
	FilterIcon,
	ColumnIcon,
} from 'src/components/video/TableToolbar'
import dataGridjaJP from 'src/foundations/dataGridjaJP'
import { columns } from 'src/data/userData'
import { User } from 'src/interfaces/api'

import useDataGrid from 'src/components/video/useDataGrid'
import { useUsers } from 'src/foundations/hooks'

const UserManageTable: React.FC = () => {
	const classes = useStyles()

	const [tableProps, , pageProps, search] = useDataGrid<User>(useUsers)

	/** validate */
	if (tableProps.error) return <div>failed to load table data.</div>
	if (!tableProps.rows) return <div>loading..</div>

	return (
		<div className={classes.root}>
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
export default UserManageTable
