import * as React from 'react'
import useStyles from 'src/styles/datagrid'
import { DataGrid } from '@material-ui/data-grid'
import TableToolbar, {
	FilterIcon,
	ColumnIcon,
} from 'src/components/video/TableToolbar'
import dataGridjaJP from 'src/foundations/dataGridjaJP'
import TagFab from 'src/components/tag/TagFab'
import { columns } from 'src/data/tagData'
import { Tag } from 'src/interfaces/api'

import useDataGrid from 'src/components/video/useDataGrid'
import { useTags } from 'src/foundations/hooks'

const TagManageTable: React.FC = () => {
	const classes = useStyles()

	/** load state */
	const [tableProps, rowProps, pageProps, search] = useDataGrid<Tag>(useTags)

	/** validate */
	if (tableProps.error) return <div>faield to load tags</div>
	if (!tableProps.rows) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<TagFab selectedRow={rowProps.selected as Tag} />
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
				rowsPerPageOptions={[10, 20, 50, 100]}
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
export default TagManageTable
