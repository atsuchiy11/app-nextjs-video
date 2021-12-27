import React, { useRef } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import Vimeo from '@u-wave/react-vimeo'
import UserAction from 'src/components/player/UserAction'
import Summary from 'src/components/player/Summary'
import Threads from 'src/components/player/Threads'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import useManageHistory from 'src/components/player/useManageHistory'
import { getVideoCreated } from 'src/foundations/util'
import { useVideo } from 'src/foundations/hooks'

const useStyles = makeStyles((theme: Theme) => ({
	video: {
		width: '100%',
	},
	divider: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	wraper: {
		// サードパーティのFWなのでMUIのフォント設定が効かない
		fontFamily: "'M PLUS Rounded 1c', sans-serif",
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2),
		minHeight: 80,
		'& a': {
			textDecoration: 'underline',
			color: theme.palette.primary.main,
		},
	},
}))

const VideoPlayer: React.FC = () => {
	const classes = useStyles()
	const ref = useRef<Vimeo>()

	const { onReady, onPause, onEnd } = useManageHistory()
	const { video, videoError } = useVideo()

	/** validate */
	if (videoError) return <div>faield to load video.</div>
	if (!video) return <div>loading...</div>

	return (
		<div className={classes.video}>
			<Vimeo
				// video="id or URL"
				video={video.PK.split('/')[2]}
				controls={true}
				showByline={false}
				showPortrait={false}
				showTitle={false}
				speed={true}
				responsive
				autoplay
				onReady={onReady}
				onPause={onPause}
				onEnd={onEnd}
				ref={ref}
			/>
			<Divider className={classes.divider} />
			<Typography variant="h5" gutterBottom>
				{video.name}
				<Typography variant="caption" style={{ paddingLeft: '10px' }}>
					{video.plays} 回視聴 | {getVideoCreated(video.createdAt)}
				</Typography>
			</Typography>
			<Summary />
			<Divider className={classes.divider} />
			<UserAction />
			<Threads />
		</div>
	)
}
export default VideoPlayer
