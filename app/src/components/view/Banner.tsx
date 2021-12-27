import * as React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme: Theme) => ({
	wraper: {
		'& .MuiBox-root::-webkit-scrollbar': {
			display: 'none',
		},
	},
	root: {
		overflowX: 'scroll',
		whiteSpace: 'nowrap',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	card: {
		width: '40%',
		display: 'inline-block',
		marginRight: theme.spacing(1),
	},
	media: {
		height: 0,
		paddingTop: '56.25%', //16:9,
		position: 'relative',
	},
	description: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: theme.palette.primary.dark,
		opacity: 0.75,
		width: '100%',
	},
	overflow: {
		overflowX: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
}))

const Banner: React.FC = () => {
	const classes = useStyles()

	return (
		<div className={classes.wraper}>
			<Box className={classes.root}>
				{[0, 1, 2, 3, 4, 5].map((index) => (
					<Card
						className={classes.card}
						key={index}
						data-testid="banner">
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image="/design.jpg"
								title="Banner Image"
								data-testid="banner-image">
								<Box className={classes.description}>
									<Typography
										variant="subtitle2"
										data-testid="banner-title">
										title
									</Typography>
									<Typography
										variant="caption"
										component="p"
										className={classes.overflow}
										data-testid="banner-text">
										Learning path description ... Lorem
										ipsum dolor sit amet, consectetur
										adipisicing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis
										nostrud exercitation ullamco laboris
										nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit
										in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat non proident, sunt in
										culpa qui officia deserunt mollit anim
										id est laborum.
									</Typography>
								</Box>
							</CardMedia>
						</CardActionArea>
					</Card>
				))}
			</Box>
		</div>
	)
}
export default Banner
