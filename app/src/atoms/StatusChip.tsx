import * as React from 'react'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import { useAppContext } from 'src/foundations/AppProvider'

interface Props {
	value: string
}

const StatusChip: React.FC<Props> = ({ value }) => {
	const { state, dispatch } = useAppContext()
	const handleClick = () => {
		dispatch({
			openAlert: {
				payload: {
					open: !state.openAlert.open,
					message:
						'あれ？データがおかしいですね。システム管理者に聞いてみましょう。',
					severity: 'error',
				},
			},
		})
	}
	return (
		<>
			<Button>
				{value ? (
					<CheckCircleIcon color="primary" />
				) : (
					<ErrorIcon color="secondary" onClick={handleClick} />
				)}
			</Button>
		</>
	)
}
export default StatusChip
