import { Theme, makeStyles } from '@material-ui/core/styles'

const mediaHeight = 100
const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
		margin: theme.spacing(6),
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
	margin: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))
export default useStyles
