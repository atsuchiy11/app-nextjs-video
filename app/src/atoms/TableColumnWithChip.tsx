import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import LightTooltip from 'src/atoms/LightTooltip'

const useStyles = makeStyles(() => ({
	ellipsis: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflowX: 'hidden',
	},
}))

interface Props {
	value: string
}
const ColumnWithChip: React.FC<Props> = ({ value }) => {
	const classes = useStyles()
	return (
		<LightTooltip title={value}>
			<Typography variant="subtitle2" className={classes.ellipsis}>
				{value}
			</Typography>
		</LightTooltip>
	)
}
export default ColumnWithChip
