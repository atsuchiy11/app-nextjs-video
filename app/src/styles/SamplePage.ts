import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		minHeight: '100vh',
		padding: '0 0.5rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	main: {
		padding: '5rem 0',
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	footer: {
		width: '100%',
		height: '100px',
		borderTop: '1px solid #eaeaea',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		color: theme.palette.secondary.contrastText,
	},
	footer_a: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}))
export default useStyles
