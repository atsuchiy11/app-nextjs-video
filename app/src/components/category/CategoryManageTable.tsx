import React from 'react'
import useStyles from 'src/styles/datagrid'
import { DataGrid } from '@material-ui/data-grid'
import TableToolbar, {
	FilterIcon,
	ColumnIcon,
} from 'src/components/video/TableToolbar'
import dataGridjaJP from 'src/foundations/dataGridjaJP'
import CategoryFab from 'src/components/category/CategoryFab'
import { columns } from 'src/data/categoryData'
import { Category } from 'src/interfaces/api'
import { useCategories } from 'src/foundations/hooks'
import useDataGrid from 'src/components/video/useDataGrid'

const CategoryManageTable: React.FC = () => {
	const classes = useStyles()

	/** load state */
	const [tableProps, rowProps, pageProps, search] =
		useDataGrid<Category>(useCategories)

	/** validate */
	if (tableProps.error) return <div>faield to load tags</div>
	if (!tableProps.rows) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<CategoryFab selectedRow={rowProps.selected as Category} />
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
				// autoHeight
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
export default CategoryManageTable
