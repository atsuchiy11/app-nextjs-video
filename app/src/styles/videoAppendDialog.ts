import { Theme, makeStyles } from '@material-ui/core/styles'
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles'
import { getThemePaletteMode } from '@material-ui/data-grid'

const mediaHeight = 100
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
			// dialog
			appBar: {
				position: 'relative',
			},
			title: {
				marginLeft: theme.spacing(2),
				flex: 1,
			},
			card: {
				minHeight: mediaHeight,
				minWidth: `calc(${mediaHeight * 1.78}px)`, //1.78=16/9
				marginRight: theme.spacing(4),
			},
			input: {
				opacity: 0,
				appearance: 'none',
				position: 'absolute',
			},
			media: {
				height: mediaHeight,
				width: 'inherit',
			},
			content: {
				marginBottom: theme.spacing(2),
			},
			text: {
				'& > *': {
					margin: theme.spacing(1),
				},
			},
		}
	},
	{ defaultTheme }
)
export default useStyles
