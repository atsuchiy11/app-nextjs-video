import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import { jaJP } from '@material-ui/core/locale'

// Create a theme instance.
const theme = createMuiTheme(
	{
		overrides: {
			MuiCssBaseline: {
				'@global': {
					body: {
						// fontFamily: 'Noto Sans JP',
						fontFamily: "'M PLUS Rounded 1c', sans-serif",
						// fontFamily: "'Kosugi', sans-serif",
					},
				},
			},
		},
		typography: {
			fontFamily: ["'M PLUS Rounded 1c', sans-serif"].join(','),
			// fontFamily: ["'Kosugi', sans-serif"].join(','),
		},
		palette: {
			type: 'dark',
			primary: {
				// main: '#3ea6ff',
				main: '#00aac6',
				dark: '#424242',
				contrastText: '#fff',
			},
			secondary: {
				// main: '#e91e63',
				main: '#d90000',
				// contrastText: '#424242',
				contrastText: '#fff',
			},
			error: {
				main: red.A400,
			},
		},
	},
	jaJP
)

export default responsiveFontSizes(theme)
