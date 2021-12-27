import React from 'react'
import Chip from '@material-ui/core/Chip'
import ColumnWithChip from 'src/atoms/TableColumnWithChip'
import { GridColDef, GridCellParams } from '@material-ui/data-grid'

/**
 * status table definition
 */
export const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100, hide: true },
	{
		field: 'status',
		headerName: 'ステータス',
		width: 150,
		renderCell: (params: GridCellParams) => (
			<Chip
				label={params.value}
				color={params.value == '完了' ? 'primary' : 'default'}
			/>
		),
	},
	{
		field: 'filename',
		headerName: 'ファイル名',
		width: 240,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'name',
		headerName: 'タイトル',
		width: 280,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'createdUser',
		headerName: '作業者',
		width: 200,
	},
	{
		field: 'createdAt',
		headerName: 'アップロード日時',
		width: 200,
	},
]
