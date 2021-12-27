import * as React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import usePlaylist from 'src/components/player/usePlaylist'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		overflow: 'scroll',
		overflowX: 'hidden',
		whiteSpace: 'nowrap',
		// 960px未満は1columnでフルサイズ
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	detail: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		marginBottom: theme.spacing(1),
	},
}))

const PlayList: React.FC = () => {
	const classes = useStyles()
	const { path, pathError, videos, videoError, getList } = usePlaylist()

	/** validate */
	if (videoError) return <div>failed to load videos</div>
	if (pathError) return <div>failed to load paths</div>
	if (!videos) return <div>loading...</div>
	if (!path) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<div className={classes.detail}>{getList()}</div>
		</div>
	)
}
export default PlayList
