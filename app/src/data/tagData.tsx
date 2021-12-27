import * as React from 'react'
import { GridColDef, GridCellParams } from '@material-ui/data-grid'
import Chip from '@material-ui/core/Chip'
import ColumnWithChip from 'src/atoms/TableColumnWithChip'

/**
 * tag table definition
 */
export const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{
		field: 'PK',
		headerName: 'Key',
		width: 120,
		hide: true,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'invalid',
		headerName: '公開',
		width: 120,
		renderCell: (params: GridCellParams) => (
			<Chip
				label={params.value ? '非公開' : '公開中'}
				color={params.value ? 'default' : 'primary'}
			/>
		),
	},
	{
		field: 'name',
		headerName: 'タグ名',
		width: 250,
		renderCell: (params: GridCellParams) => <Chip label={params.value} />,
	},
	// { field: 'count', headerName: '動画数', width: 150 },
	{
		field: 'description',
		headerName: '備考',
		width: 300,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{ field: 'createdUser', headerName: '作成者', width: 200 },
	{
		field: 'createdAt',
		headerName: '作成日時',
		width: 160,
		type: 'date',
	},
	{ field: 'updatedUser', headerName: '更新者', width: 200, hide: true },
	{
		field: 'updatedAt',
		headerName: '更新日時',
		width: 160,
		type: 'date',
		hide: true,
	},
]
