import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import ScreenShareIcon from '@material-ui/icons/ScreenShare'
import LightTooltip from 'src/atoms/LightTooltip'

import useFavorite from 'src/components/player/useFavorite'
import useLikes from 'src/components/player/useLikes'
import useThreads from 'src/components/player/useThreads'
import { useTips } from 'src/atoms/Tips'

const useStyles = makeStyles(() => ({
	bottomNav: { width: '100%' },
}))

const UserAction = () => {
	const classes = useStyles()
	const { showTips } = useTips()

	const { favorite, favoriteError, favoriteColor, handleFavorite } =
		useFavorite()
	const { likes, likeError, goodColor, badColor, handleLike } = useLikes()
	const { threads, threadError, open, setOpen } = useThreads()

	/** copy url to clipboard */
	const handleCopy = () => {
		// IE無視していいならもっとマシな書き方ある。。
		const input = document.createElement('input')
		document.body.appendChild(input)
		input.value = location.href
		input.select()
		document.execCommand('copy')
		document.body.removeChild(input)
		showTips('URLをクリップボードにコピーしました！', 'info')
	}

	/** validate */
	if (favoriteError) return <div>failed to load favorite.</div>
	if (likeError) return <div>failed to load lieks.</div>
	if (threadError) return <div>failed to load threads.</div>
	if (!favorite || !likes || !threads) return <div>loading...</div>

	return (
		<BottomNavigation showLabels className={classes.bottomNav}>
			<LightTooltip
				title={
					goodColor == 'primary' ? '高評価を取り消し' : '高く評価'
				}>
				<BottomNavigationAction
					label={likes.good.length}
					icon={<ThumbUpIcon color={goodColor} fontSize="small" />}
					onClick={() => handleLike(true)}
				/>
			</LightTooltip>
			<LightTooltip
				title={badColor == 'primary' ? '低評価を取り消し' : '低く評価'}>
				<BottomNavigationAction
					label={likes.bad.length}
					icon={
						<ThumbDownAltIcon color={badColor} fontSize="small" />
					}
					onClick={() => handleLike(false)}
				/>
			</LightTooltip>
			<LightTooltip
				title={
					favoriteColor == 'inherit'
						? 'お気に入りに登録'
						: 'お気に入りを解除'
				}>
				<BottomNavigationAction
					icon={
						<FavoriteIcon color={favoriteColor} fontSize="small" />
					}
					onClick={() => handleFavorite()}
				/>
			</LightTooltip>
			<LightTooltip title={open ? 'コメントを非表示' : 'コメントを表示'}>
				<BottomNavigationAction
					label={threads.length}
					icon={<ChatBubbleOutlineIcon fontSize="small" />}
					onClick={setOpen}
				/>
			</LightTooltip>
			<LightTooltip title="URLをコピー">
				<BottomNavigationAction
					icon={<ScreenShareIcon fontSize="small" />}
					onClick={handleCopy}
				/>
			</LightTooltip>
		</BottomNavigation>
	)
}
export default UserAction
