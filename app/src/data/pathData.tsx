import * as React from 'react'
import {
	GridColDef,
	GridCellParams,
	GridValueGetterParams,
} from '@material-ui/data-grid'
import Chip from '@material-ui/core/Chip'
import ColumnWithChip from 'src/atoms/TableColumnWithChip'

/**
 * 列定義と行定義をエクスポートする
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
		headerName: '再生リスト名',
		width: 250,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'videos',
		headerName: '動画数',
		width: 150,
		valueGetter: (params: GridValueGetterParams) =>
			(params.value as []).length,
	},
	{
		field: 'description',
		headerName: '概要',
		width: 450,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'note',
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

export const rows = [
	{
		id: 'L001',
		name: '新入社員入社時',
		count: 6,
		description: '新入社員が初めて受ける研修一覧です。',
		createdUser: 'k-hase@prime-x.co.jp',
	},
	{
		id: 'L002',
		name: 'キャリア入社社員入社時',
		count: 5,
		description: '中途入社社員が初めて受ける研修一覧です。',
		createdUser: 'k-hase@prime-x.co.jp',
	},
	{
		id: 'L003',
		name: '顧客理解研修',
		count: 6,
		description: '営業部門に配属された社員が受ける研修一覧です。',
		createdUser: 'k-hase@prime-x.co.jp',
	},
	{
		id: 'L004',
		name: 'マーケティング研修',
		count: 7,
		description: 'マーケティング部門に配属された社員が受ける研修一覧です。',
		createdUser: 'k-hase@prime-x.co.jp',
	},
	{
		id: 'L005',
		name: '営業スキルアップ研修',
		count: 7,
		description: '営業3年目以上の方を対象にした研修一覧です。',
		createdUser: 'k-hase@prime-x.co.jp',
	},
]
