import * as React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { useAppContext } from 'src/foundations/AppProvider'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

const Spinner: React.FC = () => {
	const classes = useStyles()
	const { state } = useAppContext()
	const { openSpinner } = state
	return (
		<Backdrop className={classes.backdrop} open={openSpinner}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
}
export default Spinner

export const useSpinner = () => {
	const { dispatch } = useAppContext()
	const showSpinner = (payload: boolean) =>
		dispatch({ openSpinner: { payload } })
	return { showSpinner }
}
