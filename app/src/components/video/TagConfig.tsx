import * as React from 'react'
import _ from 'lodash'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { TagWithChip } from 'src/components/video/useTagConfig'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import LightTooltip from 'src/atoms/LightTooltip'

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		'& > *': {
			margin: theme.spacing(0.5),
		},
		width: 'inherit',
	},
}))

interface Props {
	state: TagWithChip[]
	handleTags: (id: string) => void
}

const TagConfig: React.FC<Props> = (props) => {
	const classes = useStyles()

	const { state: tags, handleTags } = props
	if (!tags) return <div>loading...</div>

	return (
		<>
			<Paper component="ul" className={classes.paper}>
				{tags.map((tag) => (
					<LightTooltip title={tag.description} key={tag.PK}>
						<Chip
							label={tag.name}
							key={tag.PK}
							color={tag.selected}
							onClick={() => handleTags(tag.PK)}
						/>
					</LightTooltip>
				))}
			</Paper>
		</>
	)
}
export default TagConfig
