/**
 * ボツ
 */
import * as React from 'react'
export const Garbage = () => <div>ボツ</div>

// import * as React from 'react'
// import { Theme, makeStyles } from '@material-ui/core/styles'

// import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardMedia from '@material-ui/core/CardMedia'
// import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'
// import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
// import Box from '@material-ui/core/Box'

// import Fab from '@material-ui/core/Fab'
// import EditIcon from '@material-ui/icons/Edit'
// import DeleteIcon from '@material-ui/icons/Delete'

// import { PathDev } from 'src/interfaces/index'

// const mediaHeight = 150
// const useStyles = makeStyles((theme: Theme) => ({
// 	detail: {
// 		display: 'flex',
// 		flexGrow: 1,
// 		flexDirection: 'column',
// 		marginBottom: theme.spacing(1),
// 	},
// 	card: {
// 		marginBottom: theme.spacing(2),
// 		display: 'flex',
// 		maxHeight: mediaHeight,
// 	},
// 	anchor: {
// 		width: `calc(${mediaHeight * 1.78}px)`, //1.78=16/9
// 	},
// 	media: {
// 		height: mediaHeight,
// 		width: 'inherit',
// 		position: 'relative',
// 	},
// 	outer: {
// 		position: 'absolute',
// 		backgroundColor: theme.palette.primary.dark,
// 		opacity: 0.75,
// 		bottom: 0,
// 		right: 0,
// 		width: '30%',
// 		height: 'inherit',
// 	},
// 	inner: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 		height: 'inherit',
// 	},
// 	description: {
// 		flexGrow: 1,
// 		maxWidth: '70%',
// 	},
// 	fab: {
// 		'& > *': {
// 			margin: theme.spacing(1),
// 		},
// 		display: 'flex',
// 		alignItems: 'center',
// 	},
// }))

// interface Props {
// 	paths: PathDev[]
// }

// const ManagePlayList: React.FC<Props> = ({ paths }) => {
// 	const classes = useStyles()
// 	return (
// 		<div className={classes.detail}>
// 			{/* {[7, 6, 8, 11].map((item) => ( */}
// 			{paths.map((item) => (
// 				<Card className={classes.card} key={item.id}>
// 					<CardActionArea className={classes.anchor}>
// 						<CardMedia
// 							image="/design.jpg"
// 							title="Video Title"
// 							className={classes.media}>
// 							<CardContent className={classes.outer}>
// 								<Box
// 									textAlign="center"
// 									className={classes.inner}>
// 									<Typography variant="h5">
// 										{item.count}
// 										<PlaylistPlayIcon fontSize="large" />
// 									</Typography>
// 								</Box>
// 							</CardContent>
// 						</CardMedia>
// 					</CardActionArea>
// 					<CardContent className={classes.description}>
// 						<Typography variant="subtitle2">{item.name}</Typography>
// 						<Typography variant="caption">
// 							{item.description}
// 						</Typography>
// 					</CardContent>
// 					<CardContent className={classes.fab}>
// 						<Fab color="secondary" size="small">
// 							<EditIcon />
// 						</Fab>
// 						<Fab color="default" size="small">
// 							<DeleteIcon />
// 						</Fab>
// 					</CardContent>
// 				</Card>
// 			))}
// 		</div>
// 	)
// }
// export default ManagePlayList
