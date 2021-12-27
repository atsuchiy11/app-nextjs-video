import { Theme, makeStyles } from '@material-ui/core/styles'
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles'
import { getThemePaletteMode } from '@material-ui/data-grid'

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
			datagrid: {
				background: 'rgba(30, 30, 30, 0.4)',
			},
		}
	},
	{ defaultTheme }
)
export default useStyles
