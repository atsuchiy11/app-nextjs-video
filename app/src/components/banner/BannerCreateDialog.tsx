import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import useStyles from 'src/styles/bannerDialog'
import { mutate } from 'swr'
import { useSession } from 'next-auth/client'
import { Banner, ReqBannerPost } from 'src/interfaces/api'
import { uploadImage, postBanner } from 'src/components/banner/requests'
import { useTips } from 'src/atoms/Tips'

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
import TextField from '@material-ui/core/TextField'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

interface Props {
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const BannerCreateDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { open, handler } = props
	const [session] = useSession()
	const { showTips } = useTips()

	/** dialog state */
	const [openDialog, setOpenDialog] = React.useState(open)

	/** state input */
	const [banner, setBanner] = useState({} as Banner)
	const [titleErr, setTitleErr] = useState(false)
	const [descriptionErr, setDescriptionErr] = useState(false)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('banner-create-')[1]
		setBanner({ ...banner, [key]: event.target.value })
		/** error cancel */
		if (key == 'name' && event.target.value != '') setTitleErr(false)
		if (key == 'description' && event.target.value != '')
			setDescriptionErr(false)
	}

	/** state input file */
	const [image, setImage] = useState({} as File)
	const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			const reader = new FileReader()
			reader.onload = (e) => {
				setImage(file)
				setBanner({
					...banner,
					image: e.target.result as string,
				})
			}
			reader.readAsDataURL(file)
		}
	}

	/** submit state */
	const handleSubmit = () => {
		const postData = async () => {
			/** upload banner image to S3 */
			const url = await uploadImage(image)
			if (!url) throw new Error('failed to upload image to S3.')

			/** post bannar meta to db */
			const params: ReqBannerPost = {
				user: session.user.email,
				image: url.url,
				name: banner.name,
				description: banner.description,
			}
			if ('link' in banner) params['link'] = banner.link
			if ('note' in banner) params['note'] = banner.note

			const res = await postBanner(params)
			if (!res) throw new Error('failed to upload banner')

			mutate('/banners')
			showTips('バナーを登録しました', 'info')
			setBanner({} as Banner)
			handler((value) => !value)
		}

		/** validate */
		if (!banner.image || banner.image == '') {
			showTips('まずはアップロードする画像を選択しましょう！', 'info')
			return
		}
		if (!banner.name || banner.name == '') {
			setTitleErr(true)
			showTips('タイトルは必要ですよね？', 'info')
			return
		}
		if (!banner.description || banner.description == '') {
			setDescriptionErr(true)
			showTips('テキストも必要ですよね？', 'info')
			return
		}
		postData()
	}

	/** handle close */
	const handleClose = (okCancel: boolean) => {
		if (!okCancel) {
			handler((value) => !value)
			return
		}
		handler((value) => !value)
	}

	/** Parent state wather */
	useEffect(() => setOpenDialog(open), [open])

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={openDialog}
			onClose={() => handler((value) => !value)}>
			<DialogTitle>需要がなさそう。。</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					当面は既存のバナーを使い回してください。
				</DialogContentText>
				<DialogContentText style={{ fontSize: '.9rem' }}>
					複数バナーを管理する必要性が出てきたら実装します。
				</DialogContentText>
			</DialogContent>
			<DialogActions className={classes.margin}>
				<Button onClick={() => handleClose(false)} color="primary">
					キャンセル
				</Button>
				<Button onClick={() => handleClose(true)} color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)

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
						バナー登録
					</Typography>
					<Button
						autoFocus
						variant="outlined"
						color="inherit"
						onClick={handleSubmit}>
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
								onChange={handleChangeFile}
							/>
							<CardMedia
								className={classes.media}
								image={
									banner.image
										? banner.image
										: '/no-image.png'
								}
								title="画像を選択..."
							/>
						</CardActionArea>
					</Card>
					<Grid
						container
						justify="center"
						alignItems="center"
						spacing={2}
						className={classes.content}>
						<TextField
							id="banner-create-name"
							label="バナータイトル"
							value={banner.name ? banner.name : ''}
							variant="outlined"
							fullWidth
							required
							className={classes.content}
							onChange={handleChange}
							error={titleErr}
						/>
						<TextField
							id="banner-create-description"
							label="テキスト"
							value={banner.description ? banner.description : ''}
							variant="outlined"
							fullWidth
							required
							multiline
							rows={4}
							// placeholder="文字数制限あり？"
							className={classes.content}
							onChange={handleChange}
							error={descriptionErr}
						/>
						<TextField
							id="banner-create-link"
							label="リンク先"
							value={banner.link ? banner.link : ''}
							variant="outlined"
							fullWidth
							className={classes.content}
							onChange={handleChange}
						/>
						<TextField
							id="banner-create-note"
							label="備考"
							value={banner.note ? banner.note : ''}
							placeholder="管理用のメモです。ユーザには表示されません。。"
							variant="outlined"
							fullWidth
							className={classes.content}
							onChange={handleChange}
						/>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	)
}
export default BannerCreateDialog
