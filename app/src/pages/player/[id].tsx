import * as React from 'react'
import { SWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getThreads, getVideo } from 'src/data/fetcher'

import VideoPlayer from 'src/components/player/VideoPlayer'
import PlayList from 'src/components/player/PlayList'
import Tips from 'src/atoms/Tips'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		minHeight: '100vh',
		padding: '0 0.5rem',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		// 960px未満で1column
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	container: {
		flexGrow: 1,
	},
}))

interface IPage {
	errors?: string
	fallback
}

const DetailPage: React.FC<IPage> = (props) => {
	const classes = useStyles()
	const router = useRouter()

	if (router.isFallback) return <div>loading...</div>

	/** validate */
	if (props.errors)
		return (
			<div>
				最新の情報じゃないかもしれません。。リロードしてみて下さい。
			</div>
		)
	return (
		<SWRConfig value={props.fallback}>
			<div className={classes.root}>
				<VideoPlayer />
				<PlayList />
				<Tips />
			</div>
		</SWRConfig>
	)
}
export default DetailPage

/**
 * SSG: ビルド時にレンダリングするPathを生成する
 * そのうち限界が来そう。。->事前ビルドしない
 * DBにあってvimeoにない場合、uriが空
 * @returns paths
 */
export const getStaticPaths: GetStaticPaths = async () => {
	/** SSGする */
	// const videos = await getVideos('/videos')
	// データの不整合でuri(or PK)が取れない場合はスキップ
	// const paths = videos
	// 	.filter((item) => item.uri && item.PK)
	// 	.map((item) => {
	// 		return {
	// 			params: { id: item.uri.split('/')[2] },
	// 		}
	// 	})
	// return { paths, fallback: 'blocking' }

	/** SSGしない */
	return { paths: [], fallback: 'blocking' }
}

/**
 * SSG: 各ページのパラメータをPageコンポーネントに渡す
 * ページ単位でbulkはいかがなものか。。
 * @param context receive from getStaticPaths
 */
export const getStaticProps: GetStaticProps = async (context) => {
	try {
		const id = context.params.id
		/** 1つずつ動画を取得 */
		const videoUrl = `/video/${id}`
		const threadUrl = `/thread/${id}`
		const video = await getVideo(videoUrl)
		const threads = await getThreads(threadUrl)

		return {
			props: {
				fallback: {
					videoUrl: video,
					threadUrl: threads,
				},
			},
			revalidate: 60,
		}
	} catch (err) {
		console.error(err.message)
		return { props: { errors: err.message } }
	}
}
