import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import useStyles from 'src/styles/bannerDialog'
import useBannerEdit from 'src/components/banner/useBannerEdit'
import { Banner } from 'src/interfaces/api'

import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'

interface Props {
	selectedRow: Banner
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const BannerEditDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { selectedRow, open, handler } = props

	/** load hook */
	const [bannerProps] = useBannerEdit(selectedRow, handler)

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)

	/** Parent state wather */
	useEffect(() => setOpenDialog(open), [open])

	return (
		<Dialog
			fullWidth
			maxWidth="md"
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
						バナー編集
					</Typography>
					<Button
						autoFocus
						variant="outlined"
						color="inherit"
						onClick={bannerProps.handleSubmit}>
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
								onChange={bannerProps.handleFile}
							/>
							<CardMedia
								className={classes.media}
								image={
									bannerProps.state.image
										? bannerProps.state.image
										: '/no-image.png'
								}
								title="banner image"
							/>
						</CardActionArea>
						<CardActions style={{ justifyContent: 'center' }}>
							<Button
								id="invalid"
								onClick={bannerProps.handleInvalid}>
								{bannerProps.state.invalid
									? '非公開'
									: '公開中'}
							</Button>
						</CardActions>
					</Card>
					<Box>
						<TextField
							id="banner-edit-name"
							label="バナータイトル"
							// defaultValue={selectedRow.name}
							value={bannerProps.state.name}
							color="primary"
							variant="outlined"
							fullWidth
							className={classes.content}
							onChange={bannerProps.handleInput}
						/>
						<TextField
							id="banner-edit-description"
							label="テキスト"
							// defaultValue={selectedRow.description}
							value={
								bannerProps.state.description
									? bannerProps.state.description
									: ''
							}
							variant="outlined"
							fullWidth
							multiline
							rows={4}
							className={classes.content}
							onChange={bannerProps.handleInput}
						/>
						<TextField
							id="banner-edit-link"
							label="リンク先"
							// defaultValue={selectedRow.link}
							value={
								bannerProps.state.link
									? bannerProps.state.link
									: ''
							}
							variant="outlined"
							fullWidth
							rows={4}
							className={classes.content}
							onChange={bannerProps.handleInput}
						/>
						<TextField
							id="banner-edit-note"
							label="備考"
							value={selectedRow.note ? selectedRow.note : ''}
							placeholder="管理用のメモです。ユーザには表示されません。。"
							variant="outlined"
							fullWidth
							className={classes.content}
							onChange={bannerProps.handleInput}
						/>
					</Box>
				</Grid>
			</DialogContent>
		</Dialog>
	)
}
export default BannerEditDialog
