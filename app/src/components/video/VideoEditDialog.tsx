import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import useStyles from 'src/styles/videoEditDialog'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import TagConfig from 'src/components/video/TagConfig'
import RichEditor from 'src/atoms/RichEditor'

import useVideoEdit from 'src/components/video/useVideoEdit'
import { VideoTableRow } from 'src/interfaces/api'
import { useCategories } from 'src/foundations/hooks'

interface Props {
	selectedRow: VideoTableRow
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const VideoEditDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { selectedRow, open, handler } = props

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)

	/** load state */
	const [rowProps, tagProps, editorProps, error] = useVideoEdit(
		selectedRow,
		handler
	)
	/** load cache */
	const { data: categories, error: categoryError } = useCategories()

	/** Parent state watcher */
	useEffect(() => setOpenDialog(open), [open])

	/** validate */
	if (error) return <div>failed to load data.</div>
	if (categoryError) return <div>failed to load categories.</div>
	if (!rowProps.state || !tagProps.state || !categories)
		return <div>loading...</div>

	return (
		<Dialog
			fullWidth
			maxWidth="lg"
			open={openDialog}
			onClose={() => handler((value) => !value)}>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => handler((value) => !value)}>
						<CloseIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						動画コンテンツの編集
					</Typography>
					<Button
						autoFocus
						variant="outlined"
						color="inherit"
						onClick={() =>
							rowProps.handleSubmit(editorProps.value)
						}>
						アップロード
					</Button>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<Grid className={classes.root}>
					<Card className={classes.card}>
						{/* 登録時はアップロードする動画を選択、編集時はサムネイル画像を選択 */}
						<CardActionArea component="label">
							<input
								accept="image/*"
								type="file"
								className={classes.input}
								onChange={rowProps.handleFile}
							/>
							<CardMedia
								className={classes.media}
								image={
									rowProps.state.thumbnail
										? rowProps.state.thumbnail
										: '/no-image.png'
								}
								title="画像を選択"></CardMedia>
						</CardActionArea>
						<CardActions style={{ justifyContent: 'center' }}>
							<Button
								id="invalid"
								onClick={rowProps.handleInvalid}>
								{rowProps.state.invalid ? '非公開' : '公開中'}
							</Button>
						</CardActions>
					</Card>
					<Box>
						<Grid
							container
							justify="center"
							alignItems="center"
							spacing={2}
							className={classes.content}>
							<TextField
								id="video-edit-name"
								label="動画タイトル"
								// defaultValue={row.title}
								color="primary"
								variant="outlined"
								value={
									rowProps.state.name
										? rowProps.state.name
										: ''
								}
								onChange={rowProps.handleInput}
								style={{ width: '100%' }}
								className={classes.text}
							/>
						</Grid>
						<RichEditor {...editorProps} />
						<Grid
							container
							justify="center"
							alignItems="center"
							spacing={2}
							className={classes.content}>
							<TextField
								id="video-edit-primary"
								select
								label="親カテゴリ"
								value={
									rowProps.state.primary
										? rowProps.state.primary
										: ''
								}
								onChange={rowProps.handlePrimary}
								color="primary"
								variant="outlined"
								style={{ width: '50%' }}
								className={classes.text}>
								{categories.map((category) => {
									if (category.parentId == 'C999') {
										return (
											<MenuItem
												key={category.PK}
												value={category.name}>
												{category.name}
											</MenuItem>
										)
									}
								})}
							</TextField>
							<TextField
								id="video-edit-secondary"
								select
								label="子カテゴリ"
								value={
									rowProps.state.secondary
										? rowProps.state.secondary
										: ''
								}
								onChange={rowProps.handleSecondary}
								color="primary"
								variant="outlined"
								style={{ width: '50%' }}
								className={classes.text}>
								{categories.map((category) => {
									if (
										categories.find(
											(c) =>
												c.PK == category.parentId &&
												c.name == rowProps.state.primary
										)
									) {
										return (
											<MenuItem
												key={category.PK}
												value={category.name}>
												{category.name}
											</MenuItem>
										)
									}
								})}
							</TextField>
						</Grid>
						<Typography variant="body2">タグの設定</Typography>
						<TagConfig {...tagProps} />
						<Grid
							container
							justify="center"
							alignItems="center"
							spacing={2}
							className={classes.content}>
							<TextField
								id="video-edit-note"
								label="備考"
								placeholder="管理用のメモです。ユーザには表示されません。。"
								color="primary"
								variant="outlined"
								value={
									rowProps.state.note
										? rowProps.state.note
										: ''
								}
								onChange={rowProps.handleInput}
								style={{ width: '100%' }}
								className={classes.text}
							/>
						</Grid>
					</Box>
				</Grid>
			</DialogContent>
		</Dialog>
	)
}
export default VideoEditDialog
