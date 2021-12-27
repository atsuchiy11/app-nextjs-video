import * as React from 'react'
import useStyles from 'src/styles/datagrid'
import { DataGrid } from '@material-ui/data-grid'
import TableToolbar, {
	FilterIcon,
	ColumnIcon,
} from 'src/components/video/TableToolbar'
import dataGridjaJP from 'src/foundations/dataGridjaJP'
import BannerFab from 'src/components/banner/BannerFab'
import { columns, imageColumnHeight as height } from 'src/data/bannerData'
import { Banner } from 'src/interfaces/api'

import useDataGrid from 'src/components/video/useDataGrid'
import { useBanner } from 'src/foundations/hooks'

const BannerManageTable: React.FC = () => {
	const classes = useStyles()

	/** load hook */
	const [tableProps, rowProps, pageProps, search] =
		useDataGrid<Banner>(useBanner)

	/** validate */
	if (tableProps.error) return <div>failed to load table data.</div>
	if (!tableProps.rows) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<BannerFab selectedRow={rowProps.selected as Banner} />
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
export default BannerManageTable
