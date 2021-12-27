import * as React from 'react'
import _ from 'lodash'
import { Theme, makeStyles } from '@material-ui/core/styles'
// import InfiniteScroll from 'react-infinite-scroller'
// import useInfiniteScroll from './useInfiniteScroll'

import VideoItem from 'src/components/view/VideoItem'
import SimpleBanner from './SimpleBanner'
import Grid from '@material-ui/core/Grid'
import {
	useVideos,
	useCategories,
	useTags,
	usePaths,
	useHistory,
} from 'src/foundations/hooks'
import useFavorite from 'src/components/player/useFavorite'
import useSearch from 'src/components/view/useSearch'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		flexGrow: 1,
	},
	loading: {
		margin: theme.spacing(4),
	},
}))

export const VideoGridList: React.FC = () => {
	const classes = useStyles()

	/** inifinite scroll */
	// const { loadMore, hasMore, loader } = useInfiniteScroll()

	/** filtering videos */
	const { requestSearch } = useSearch()

	/** load cache */
	const { data: videos, error: videoError } = useVideos()
	const { data: tags, error: tagError } = useTags()
	const { data: categories, error: categoryError } = useCategories()
	const { data: paths, error: pathError } = usePaths()
	const { data: history, error: historyError } = useHistory()
	const { favorite, favoriteError } = useFavorite()

	/** validate */
	if (videoError) return <div>failed to load videos.</div>
	if (tagError) return <div>failed to load tags.</div>
	if (categoryError) return <div>failed to load categories.</div>
	if (pathError) return <div>failed to load paths.</div>
	if (historyError) return <div>failed to load history.</div>
	if (favoriteError) return <div>faield to load favorite.</div>
	if (!videos || !tags || !categories || !paths || !history || !favorite)
		return <div>loading...</div>

	return (
		<Grid container spacing={3} className={classes.container}>
			<Grid item xs={12} sm={6} md={3}>
				<SimpleBanner />
			</Grid>
			{requestSearch().map((item) => {
				return (
					<Grid item xs={12} sm={6} md={3} key={item.PK}>
						<VideoItem video={item} />
					</Grid>
				)
			})}
		</Grid>
	)

	/**
	 * VimeoAPIで動的に取得することを廃止したので、当面不要と思われ。
	 * （おそらく）5000件くらいまでは大丈夫。。
	 */
	// return (
	// 	/**
	// 	 * 無限スクロールする/VimeoAPIの上限が100件なのでそれに合わせる
	// 	 * @see https://danbovey.uk/react-infinite-scroller/demo/
	// 	 */
	// 	<InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
	// 		<Grid container spacing={3} className={classes.container}>
	// 			<Grid item xs={12} sm={6} md={3}>
	// 				<SimpleBanner />
	// 			</Grid>
	// 			{requestSearch().map((item) => {
	// 				if (item.match) {
	// 					return (
	// 						<Grid item xs={12} sm={6} md={3} key={item.PK}>
	// 							<VideoItem video={item} />
	// 						</Grid>
	// 					)
	// 				}
	// 			})}
	// 		</Grid>
	// 	</InfiniteScroll>
	// )
}

export default VideoGridList
