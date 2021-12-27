import * as React from 'react'
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useBanner } from 'src/foundations/hooks'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: 345,
		height: '100%',
		// 1columnは中央揃え
		[theme.breakpoints.down('sm')]: {
			margin: 'auto',
		},
	},
	media: {
		width: '100%',
		height: 'inherit',
		// paddingTop: '56.25%', //16:9,
		position: 'relative',
	},
	text: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		height: 'inherit',
		background: 'rgba(0, 0, 0, 0.6)',
		// paddingLeft: theme.spacing(2),
		padding: theme.spacing(1),
	},
	ad: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		color: theme.palette.primary.dark,
		backgroundColor: '#fbc02d',
		lineHeight: 'inherit',
		paddingLeft: theme.spacing(0.5),
		paddingRight: theme.spacing(0.5),
		margin: theme.spacing(0.5),
	},
}))

const SimpleBanner: React.FC = () => {
	const classes = useStyles()
	const { data: banners, error } = useBanner()

	if (error) return <div>failed to load banner.</div>
	if (!banners) return <div>loading...</div>
	const banner = banners[0]

	return (
		<Card className={classes.root}>
			<Link href={banner.link} passHref>
				<CardActionArea
					component="a"
					target="_blank"
					style={{ height: 'inherit' }}>
					<CardMedia
						className={classes.media}
						image={banner.image}
						title={banner.name}>
						<Box className={classes.text}>
							<Typography
								variant="h6"
								component="span"
								style={{ fontWeight: 'bold' }}>
								{banner.name}
							</Typography>
							<Typography variant="subtitle2" component="span">
								{banner.description}
							</Typography>
						</Box>
						<Typography
							variant="overline"
							component="p"
							className={classes.ad}>
							広告
						</Typography>
					</CardMedia>
				</CardActionArea>
			</Link>
		</Card>
	)
}
export default SimpleBanner
