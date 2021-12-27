import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import useStyles from 'src/styles/videoCreateDialog'

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
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import TagConfig from 'src/components/video/TagConfig'
import RichEditor from 'src/atoms/RichEditor'

import useVideoCreate from 'src/components/video/useVideoCreate'
import { getCategories } from 'src/data/fetcher'

interface Props {
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const VideoCreateDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { open, handler } = props
	const ref = React.useRef()

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)

	/** load state */
	const [rowProps, tagProps, editorProps, validate, error] =
		useVideoCreate(handler)

	/** load cache */
	const { data: categories, error: categoryError } = useSWR(
		'/categories',
		getCategories
	)

	/** Parsent state wather */
	useEffect(() => setOpenDialog(open), [open])

	/** validate */
	if (categoryError) return <div>failed to load categories.</div>
	if (error) return <div>failed to load data.</div>
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
						動画コンテンツの登録
					</Typography>
					<Button
						autoFocus
						variant="outlined"
						color="inherit"
						onClick={rowProps.handleSubmit}>
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
								accept="video/*"
								type="file"
								className={classes.input}
								onChange={rowProps.handleFile}
							/>
							<CardMedia
								component="video"
								poster={
									rowProps.state.thumbnail
										? ''
										: '/no-image.png'
								}
								ref={ref}
								className={classes.media}
								src={
									rowProps.state.thumbnail
										? rowProps.state.thumbnail
										: ''
								}
								title="video title"></CardMedia>
						</CardActionArea>
					</Card>
					<Box>
						<Grid
							container
							justify="center"
							alignItems="center"
							spacing={2}
							className={classes.content}>
							<TextField
								id="video-create-name"
								label="動画タイトル"
								color="primary"
								variant="outlined"
								required
								value={
									rowProps.state.name
										? rowProps.state.name
										: ''
								}
								onChange={rowProps.handleInput}
								// style={{ width: '80%' }}
								style={{ width: '100%' }}
								className={classes.text}
								error={validate.title}
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
								id="video-create-primary"
								select
								label="親カテゴリ"
								required
								value={
									rowProps.state.primary
										? rowProps.state.primary
										: ''
								}
								onChange={rowProps.handlePrimary}
								color="primary"
								variant="outlined"
								style={{ width: '50%' }}
								className={classes.text}
								error={validate.primary}>
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
								id="video-create-secondary"
								select
								label="子カテゴリ"
								required
								value={
									rowProps.state.secondary
										? rowProps.state.secondary
										: ''
								}
								onChange={rowProps.handleSecondary}
								color="primary"
								variant="outlined"
								style={{ width: '50%' }}
								className={classes.text}
								error={validate.secondary}>
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
						<Typography variant="body2">タグ設定</Typography>
						<TagConfig {...tagProps} />
						<Grid
							container
							justify="center"
							alignItems="center"
							spacing={2}
							className={classes.content}>
							<TextField
								id="video-create-note"
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
export default VideoCreateDialog

/** クライアント側でサムネイルを作成する場合（使うかも） */
// const canvas = document.createElement('canvas')
// canvas.width = 1920
// canvas.height = 1080
// const context = canvas.getContext('2d')
// context.drawImage(ref.current, 0, 0, 1920, 1080)
// // setState使わなくてもいいのかな。。
// if (!videoRow.tag) videoRow.tag = []
// videoRow.thumbnail = canvas.toDataURL()
