import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Param } from 'src/components/admin/StatusGridList'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
	root: {
		maxWidth: 275,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
})

interface Props {
	param: Param
}

const StatusCard: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { param } = props
	return (
		<Card className={classes.root}>
			<CardContent>
				{/* <Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom>
					{props.contents}
				</Typography> */}
				<Typography variant="h6" component="h2">
					{param.primaryTitle}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{param.primaryText}
				</Typography>
				<Typography variant="h6" component="h2">
					{param.secondaryTitle}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{param.secondaryText}
				</Typography>
			</CardContent>
		</Card>
	)
}
export default StatusCard
