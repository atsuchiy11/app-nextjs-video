import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import LightTooltip from 'src/atoms/LightTooltip'

const useStyles = makeStyles(() => ({
	ellipsis: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
}))

interface Props {
	items: string[]
	primary?: string
}
const VideoChip: React.FC<Props> = ({ items, primary }) => {
	const classes = useStyles()
	return (
		<>
			{items.map((item, index) => (
				<LightTooltip title={item} key={index}>
					<Chip
						label={item}
						color={item == primary ? 'primary' : 'default'}
						className={classes.ellipsis}
					/>
				</LightTooltip>
			))}
		</>
	)
}
export default VideoChip
