import * as React from 'react'
import { GridColDef, GridCellParams } from '@material-ui/data-grid'
import UserPermissionChip from 'src/components/user/UserPermissionChip'
import Avatar from '@material-ui/core/Avatar'

/**
 * user table definition
 */
export const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{
		field: 'image',
		headerName: 'アイコン',
		width: 140,
		renderCell: (params: GridCellParams) => (
			<Avatar alt="Google Avatar" src={params.value as string} />
		),
	},
	{ field: 'name', headerName: '表示名', width: 350 },
	{ field: 'PK', headerName: 'アカウント', width: 400 },
	{
		field: 'acl',
		headerName: '権限',
		width: 150,
		renderCell: (params: GridCellParams) => (
			<UserPermissionChip user={params.row} />
		),
	},
	{
		field: 'createdAt',
		headerName: '最終ログイン',
		width: 200,
		type: 'date',
	},
]
