import * as React from 'react'
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import LightTooltip from 'src/atoms/LightTooltip'

import { convSecToPlaytime, getVideoCreated } from 'src/foundations/util'
import { VideoDB } from 'src/interfaces/api'
import useInflowRoute from './useInflowRoute'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: 345,
		// 1columnは中央揃え
		[theme.breakpoints.down('sm')]: {
			margin: 'auto',
		},
	},
	card: {
		background: theme.palette.background.default,
		opacity: 0.9,
		'& .MuiTypography-root': {
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflowX: 'hidden',
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', //16:9,
		position: 'relative',
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
}))

interface Props {
	video: VideoDB
}

const VideoItem: React.FC<Props> = ({ video }) => {
	const classes = useStyles()
	const { createPath } = useInflowRoute(video)

	return (
		<Card className={classes.root}>
			<Link href={createPath()}>
				<CardActionArea component="a" data-testid="video-link">
					<CardMedia
						className={classes.media}
						image={
							video.thumbnail.link
								? video.thumbnail
								: '/no-image.png'
						}
						title={video.name ? video.name : 'Not Found'}>
						<Typography
							variant="overline"
							component="p"
							className={classes.playtime}>
							{convSecToPlaytime(video.duration)}
						</Typography>
					</CardMedia>
					<CardContent className={classes.card}>
						<LightTooltip title={video.name} placement="top">
							<Typography
								variant="subtitle2"
								color="textPrimary"
								component="p"
								style={{ fontWeight: 'bold' }}>
								{video.name}
							</Typography>
						</LightTooltip>
						<Typography
							variant="caption"
							color="textSecondary"
							component="p">
							{video.plays} 回視聴 |{' '}
							{getVideoCreated(video.createdAt)}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	)
}
export default VideoItem
