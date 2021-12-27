import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	DataGrid,
	GridColDef,
	GridRowData,
	GridRowParams,
} from '@material-ui/data-grid'

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		position: 'relative',
	},
}))

interface Props {
	rows: GridRowData[]
	columns: GridColDef[]
	pageSize: number
}

const ManageTable: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { rows, columns, pageSize } = props
	const [selected, setSelected] = React.useState({})
	const handleChange = (params: GridRowParams) => setSelected(params.row)

	return (
		<div className={classes.root}>
			<div>{JSON.stringify(selected)}</div>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				autoHeight
				onRowClick={handleChange}
			/>
		</div>
	)
}
export default ManageTable
