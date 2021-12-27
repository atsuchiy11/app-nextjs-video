import * as React from 'react'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

interface Props {
	open: boolean
	handler: React.Dispatch<React.SetStateAction<boolean>>
	message: string
	severity: 'error' | 'info' | 'success' | 'warning'
}

/**
 * もう使ってない。。
 */
const Notification: React.FC<Props> = (props) => {
	const { open, handler, message, severity } = props
	const handleClose = () => handler(false)

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Note archived">
				<Alert severity={severity}>{message}</Alert>
			</Snackbar>
		</>
	)
}
export default Notification
