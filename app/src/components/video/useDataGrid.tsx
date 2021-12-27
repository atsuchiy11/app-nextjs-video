import _ from 'lodash'
import { useEffect, useState } from 'react'
import {
	GridPageChangeParams,
	GridRowParams,
	GridRowData,
	GridSelectionModelChangeParams,
} from '@material-ui/data-grid'

const useDataGrid = <T,>(dataHook) => {
	const { data: rows, error } = dataHook()
	const [selected, setSelected] = useState({} as GridRowData)
	const [checked, setChecked] = useState([])
	const [pageSize, setPageSize] = useState(20)
	const [searchText, setSearchText] = useState('')
	const [filteredRows, setFilteredRows] = useState([] as T[])

	/** state selected row */
	const handleChangeRow = (params: GridRowParams) => setSelected(params.row)

	/** state checked rows */
	const handleChangeSelect = (params: GridSelectionModelChangeParams) => {
		// 行のindex(=id)を配列で保持する
		setChecked(params.selectionModel)
	}

	/** handle page size */
	const handleChangePageSize = (params: GridPageChangeParams) =>
		setPageSize(params.pageSize)

	/** filtering data table */
	const requestSearch = (searchValue: string) => {
		setSearchText(searchValue)
		const searchRegex = new RegExp(_.escapeRegExp(searchValue), 'i')
		const filteredRows = rows.filter((row: any) => {
			return Object.keys(row).some((field: any) => {
				return searchRegex.test(row[field].toString())
			})
		})
		setFilteredRows(filteredRows)
	}

	/** initialize data table */
	useEffect(() => {
		if (!rows) return
		setFilteredRows(rows)
	}, [rows])

	return [
		{ rows, error },
		{
			selected,
			onChange: handleChangeRow,
			checked,
			onSelect: handleChangeSelect,
			resetCheck: setChecked,
		},
		{ size: pageSize, onChange: handleChangePageSize },
		{ text: searchText, rows: filteredRows, request: requestSearch },
	] as [
		{
			rows: T[]
			error: any
		},
		{
			selected: GridRowData
			onChange: (params: GridRowParams) => void
			checked: []
			onSelect: (params: GridSelectionModelChangeParams) => void
			resetCheck: React.Dispatch<React.SetStateAction<any[]>>
		},
		{
			size: number
			onChange: (params: GridPageChangeParams) => void
		},
		{
			text: string
			rows: T[]
			request: (searchValue: string) => void
		}
	]
}
export default useDataGrid
