import * as React from 'react'
import Link from 'next/link'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { VideoDB } from 'src/interfaces/api'
import { convSecToPlaytime, getVideoCreated } from 'src/foundations/util'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => ({
	card: {
		marginBottom: theme.spacing(1),
	},
	media: {
		height: 0,
		paddingTop: '56.25%', //16:9,
		position: 'relative',
	},
	description: {
		// maxWidth: 345,
		// maxHeight: 120,
		width: 345,
		height: 80,
		[theme.breakpoints.down('sm')]: {
			maxWidth: 'none',
		},
	},
	playtime: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: theme.palette.primary.dark,
		opacity: 0.75,
		lineHeight: 'inherit',
		paddingLeft: theme.spacing(0.5),
		paddingRight: theme.spacing(0.5),
		margin: theme.spacing(0.5),
	},
	nowPlaying: {
		position: 'absolute',
		top: '40%',
		left: '42%',
		backgroundColor: theme.palette.primary.dark,
		opacity: 0.75,
		paddingLeft: theme.spacing(0.5),
		paddingRight: theme.spacing(0.5),
	},
}))

interface IVideo {
	item: VideoDB
	href: string
	order: number
	nowPlaying: boolean
}

const VideoItem: React.FC<IVideo> = (props) => {
	const classes = useStyles()
	const { item, href, order, nowPlaying } = props
	return (
		<Card className={classes.card}>
			<Link href={href}>
				<CardActionArea>
					<CardMedia
						image={item.thumbnail}
						title={item.name}
						className={classes.media}>
						<Typography
							variant="overline"
							component="p"
							className={classes.playtime}>
							{convSecToPlaytime(item.duration)}
						</Typography>
						{nowPlaying && (
							<Typography
								variant="subtitle1"
								className={classes.nowPlaying}>
								再生中
							</Typography>
							// <div className={classes.nowPlaying}>
							// 	<PlayArrowIcon fontSize="large" />
							// </div>
						)}
					</CardMedia>
					<CardContent className={classes.description}>
						<Typography variant="subtitle2">
							{order ? `${order}. ` : ''}
							{item.name}
						</Typography>
						<Typography variant="caption">
							{item.plays} 回視聴 |{' '}
							{getVideoCreated(item.createdAt)}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	)
}
export default VideoItem
