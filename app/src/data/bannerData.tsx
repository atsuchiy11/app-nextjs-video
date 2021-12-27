import * as React from 'react'
import { GridColDef, GridCellParams } from '@material-ui/data-grid'
import Image from 'next/image'
import Chip from '@material-ui/core/Chip'
import ColumnWithChip from 'src/atoms/TableColumnWithChip'

const imageColumnWidth = 200
export const imageColumnHeight = (imageColumnWidth * 9) / 16

/**
 * banner table definition
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
		field: 'image',
		headerName: 'イメージ',
		width: imageColumnWidth,
		renderCell: (params: GridCellParams) => (
			<Image
				src={params.value as string}
				width={params.colDef.width}
				height={imageColumnHeight}
			/>
		),
	},
	{
		field: 'url',
		headerName: 'イメージURL',
		width: 480,
		hide: true,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.row.image as string} />
		),
	},
	{
		field: 'name',
		headerName: 'タイトル',
		width: 250,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'description',
		headerName: 'テキスト',
		width: 450,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'link',
		headerName: 'リンク先',
		width: 250,
		renderCell: (params: GridCellParams) => (
			<a href={params.value as string} target="_blank" rel="noreferrer">
				{params.value}
			</a>
		),
	},
	{ field: 'createdUser', headerName: '作成者', width: 200, hide: true },
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
