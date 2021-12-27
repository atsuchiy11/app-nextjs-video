import * as React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles'

import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid'
import dataGridjaJP from 'src/foundations/dataGridjaJP'

import { columns } from 'src/data/statusData'
import useUploadStatus from 'src/components/video/useUploadStatus'

const defaultTheme = createMuiTheme()
const useStyles = makeStyles(
	(theme: Theme) => {
		const getHoverBackgroundColor = (color) =>
			getThemePaletteMode(theme.palette) === 'dark'
				? darken(color, 0.5)
				: lighten(color, 0.5)

		return {
			root: {
				width: '100%',
				position: 'relative',
				height: '75vh',
				'& .MuiButton-label': {
					color: theme.palette.secondary.contrastText,
				},
				'& .MuiDataGrid-row.Mui-selected': {
					backgroundColor: getHoverBackgroundColor(
						theme.palette.info.main
					),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor(
							theme.palette.info.main
						),
					},
				},
			},
		}
	},
	{ defaultTheme }
)

const StatusTable: React.FC = () => {
	const classes = useStyles()

	/** load state */
	const { status, statusError } = useUploadStatus()

	/** validate */
	if (statusError) return <div>failed to load status.</div>
	if (!status) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<DataGrid
				localeText={dataGridjaJP}
				rows={status}
				columns={columns}
				pageSize={10}
				// hideFooter
				autoHeight
				rowHeight={50}
			/>
		</div>
	)
}
export default StatusTable
