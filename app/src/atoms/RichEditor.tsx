import * as React from 'react'
import 'draft-js/dist/Draft.css'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Editor, EditorState, DraftHandleValue } from 'draft-js'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import FormatSizeIcon from '@material-ui/icons/FormatSize'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import LinkIcon from '@material-ui/icons/Link'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => ({
	wraper: {
		// 外部FWなのでフォント適用されないと思われるので個別に設定
		fontFamily: "'M PLUS Rounded 1c', sans-serif",
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper,
		border: '1px solid rgb(118,118,118)',
		borderRadius: '4px',
		// padding: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingTop: theme.spacing(2),
		minHeight: 80,
		'& .public-DraftEditor-content': {
			minHeight: 80,
		},
		'& a': {
			textDecoration: 'underline',
			color: theme.palette.primary.main,
		},
		'&:hover': {
			border: '1px solid #fff',
			cursor: 'text',
		},
		'&:focus-within': {
			border: `2px solid ${theme.palette.primary.main}`,
		},
		marginBottom: theme.spacing(2),
	},
}))

interface Props {
	value: EditorState
	onChange: React.Dispatch<React.SetStateAction<EditorState>>
	handleKeyCommand: (
		command: string,
		editorState: EditorState
	) => DraftHandleValue
	handleToggleClick: (e: React.MouseEvent, inlineStyle: string) => void
	handleBlockClick: (e: React.MouseEvent, blockType: string) => void
	handleAddLink: () => void
}

export const RichEditor: React.FC<Props> = (props) => {
	const classes = useStyles()
	const {
		value,
		onChange,
		handleKeyCommand,
		handleToggleClick,
		handleBlockClick,
		handleAddLink,
	} = props

	return (
		<>
			<Typography variant="body2">概要欄</Typography>
			<Grid container alignItems="center">
				<IconButton
					onClick={(e) => handleBlockClick(e, 'header-three')}>
					<FormatSizeIcon />
				</IconButton>
				<IconButton onClick={(e) => handleToggleClick(e, 'BOLD')}>
					<FormatBoldIcon />
				</IconButton>
				<IconButton onClick={(e) => handleToggleClick(e, 'ITALIC')}>
					<FormatItalicIcon />
				</IconButton>
				<IconButton onClick={(e) => handleToggleClick(e, 'UNDERLINE')}>
					<FormatUnderlinedIcon />
				</IconButton>
				<IconButton
					onClick={(e) => handleBlockClick(e, 'unordered-list-item')}>
					<FormatListBulletedIcon />
				</IconButton>
				<IconButton
					onClick={(e) => handleBlockClick(e, 'ordered-list-item')}>
					<FormatListNumberedIcon />
				</IconButton>
				<IconButton
					// disabled={editorState.getSelection().isCollapsed()}
					disabled={value.getSelection().isCollapsed()}
					onMouseDown={(e) => {
						e.preventDefault()
						handleAddLink()
					}}
					onClick={(e) => handleBlockClick(e, 'ordered-list-item')}>
					<LinkIcon />
				</IconButton>
			</Grid>
			<Box className={classes.wraper}>
				<Editor
					editorState={value}
					onChange={onChange}
					handleKeyCommand={handleKeyCommand}
				/>
			</Box>
			{/* <button onClick={onLogClick}>ログ</button> */}
		</>
	)
}
export default RichEditor
