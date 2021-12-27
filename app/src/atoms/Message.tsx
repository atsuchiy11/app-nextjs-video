import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Message = () => {
	return (
		<>
			<Typography>message!</Typography>
			<Button onClick={() => window.alert('With typescript and Jest')}>
				button
			</Button>
		</>
	)
}
export default Message
