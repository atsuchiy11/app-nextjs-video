import React, { useState, useEffect } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { linkDecorator } from 'src/atoms/Link'
import { useVideo } from 'src/foundations/hooks'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme: Theme) => ({
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

/** initialize editor */
const initData = { entityMap: {}, blocks: [] }
const initState = EditorState.createWithContent(
	convertFromRaw(initData),
	linkDecorator
)

const Summary = () => {
	const classes = useStyles()
	const [editorState, setEditorState] = useState(initState)
	const { video, videoError } = useVideo()

	/** set editor state */
	useEffect(() => {
		if (!video) return
		const initData = convertFromRaw(JSON.parse(video.description))
		const initState = EditorState.createWithContent(initData, linkDecorator)
		setEditorState(initState)
	}, [video])

	/** validate */
	if (videoError) return <div>failed to load video.</div>
	if (!video) return <div>loading...</div>

	return (
		<Box className={classes.wraper}>
			<Editor
				editorState={editorState}
				onChange={setEditorState}
				readOnly={true}
			/>
		</Box>
	)
}
export default Summary
