import * as React from 'react'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { useAppContext } from 'src/foundations/AppProvider'

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

export type Severity = 'error' | 'warning' | 'info' | 'success'
export interface ITips {
	open: boolean
	message: string
	severity: 'error' | 'warning' | 'info' | 'success'
}

const Tips: React.FC = () => {
	const { state, dispatch } = useAppContext()
	const handleClose = () => {
		dispatch({
			openAlert: {
				payload: {
					...state.openAlert,
					open: false,
				},
			},
		})
	}

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={state.openAlert.open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Note archived">
				<Alert severity={state.openAlert.severity}>
					{state.openAlert.message}
				</Alert>
			</Snackbar>
		</>
	)
}
export default Tips

export const useTips = () => {
	const { state, dispatch } = useAppContext()
	const showTips = (message: string, severity: Severity) => {
		dispatch({
			openAlert: {
				payload: {
					open: !state.openAlert.open,
					message,
					severity,
				},
			},
		})
	}
	return { showTips }
}
