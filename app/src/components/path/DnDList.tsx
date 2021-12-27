import React, { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Container, Draggable, DropResult } from 'react-smooth-dnd'

import { getVideos } from 'src/data/fetcher'
import { Path, VideoDB } from 'src/interfaces/api'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import LightTooltip from 'src/atoms/LightTooltip'
import VideoRemoveDialog from 'src/components/path/VideoRemoveDialog'

const mediaHeight = 150
const useStyles = makeStyles((theme: Theme) => ({
	card: {
		marginBottom: theme.spacing(2),
		display: 'flex',
		maxHeight: mediaHeight,
		width: '100%',
	},
	media: {
		height: mediaHeight,
		width: `calc(${mediaHeight * 1.78}px)`, //1.78=16/9
		position: 'relative',
	},
	description: {
		flexGrow: 1,
		width: '60%',
	},
	fab: {
		'& > *': {
			margin: theme.spacing(1),
		},
		display: 'flex',
		alignItems: 'center',
	},
}))

interface IItem {
	video: VideoDB
	path: Path
	setPath: React.Dispatch<React.SetStateAction<Path>>
}

export const VideoItem: React.FC<IItem> = (props) => {
	const classes = useStyles()
	const { video, path, setPath } = props

	/** delete dialog state */
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const handleClickDelete = (okCancel: boolean) => {
		if (okCancel) {
			const newPath = {
				...path,
				videos: path.videos.filter((path) => path.uri != video.uri),
			}
			setPath(newPath)
			setOpenDeleteDialog(!openDeleteDialog)
		} else {
			setOpenDeleteDialog(!openDeleteDialog)
		}
	}

	return (
		<Box display="flex">
			<Button className="dragHandleSelector">
				<DragHandleIcon fontSize="large" />
			</Button>
			<Card className={classes.card}>
				<Link href={`/player/${video.uri.split('/')[2]}`} passHref>
					<LightTooltip title="クリックすると動画を再生できます">
						<CardActionArea
							style={{ width: 'auto' }}
							component="a"
							target="_blank">
							<CardMedia
								image={video.thumbnail}
								className={classes.media}
							/>
						</CardActionArea>
					</LightTooltip>
				</Link>
				<CardContent className={classes.description}>
					<Typography variant="h6" style={{ fontWeight: 'bold' }}>
						{video.name}
					</Typography>
					<Typography variant="subtitle2">{video.PK}</Typography>
					<Typography variant="subtitle2">{video.note}</Typography>
				</CardContent>
				<CardContent className={classes.fab}>
					<Fab
						color="default"
						size="small"
						onClick={() => handleClickDelete(false)}>
						<DeleteIcon />
					</Fab>
					<VideoRemoveDialog
						pathName={path.name}
						videoName={video.name}
						open={openDeleteDialog}
						handler={handleClickDelete}
					/>
				</CardContent>
			</Card>
		</Box>
	)
}

interface Props {
	path: Path
	setPath: React.Dispatch<React.SetStateAction<Path>>
	onDrop: (dropResult: DropResult) => void
}

const DnDList: React.FC<Props> = ({ path, setPath, onDrop }) => {
	/** load cache */
	const { data: videos, error: videoError } = useSWR(
		'/videos?open=false',
		getVideos
	)

	/** validate */
	if (videoError) return <div>faield to load videos.</div>
	if (!path || !videos) return <div>Loading...</div>

	return (
		<>
			<Container
				dragHandleSelector=".dragHandleSelector"
				lockAxis="y"
				onDrop={onDrop}>
				{path.videos.map((videoOrder) => {
					const video = videos.find((v) => v.PK == videoOrder.uri)
					if (video) {
						return (
							<Draggable key={video.PK}>
								<Box display="flex" flexDirection="column">
									<VideoItem
										video={video}
										path={path}
										setPath={setPath}
									/>
								</Box>
							</Draggable>
						)
					}
				})}
				{path.videos.length <= 0 && (
					<div style={{ marginTop: '16px' }}>
						動画コンテンツは設定されていません
					</div>
				)}
			</Container>
		</>
	)
}
export default DnDList
