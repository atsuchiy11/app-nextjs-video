import * as React from 'react'
import _ from 'lodash'
import { GridColDef, GridCellParams } from '@material-ui/data-grid'
import Chip from '@material-ui/core/Chip'
import ColumnWithChip from 'src/atoms/TableColumnWithChip'

/**
 * category table definition
 */
export const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
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
		field: 'parentId',
		headerName: 'Key',
		width: 120,
		hide: true,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'parent',
		headerName: '親カテゴリ',
		width: 180,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
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
		field: 'name',
		headerName: 'カテゴリ',
		width: 200,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'description',
		headerName: '概要',
		width: 450,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{ field: 'note', headerName: '備考', width: 250, hide: true },
	{ field: 'createduser', headerName: '作成者', width: 200, hide: true },
	{
		field: 'createdAt',
		headerName: '作成日時',
		width: 160,
		type: 'date',
		hide: true,
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
