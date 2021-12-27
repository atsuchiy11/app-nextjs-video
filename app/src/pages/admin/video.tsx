import * as React from 'react'
import { SWRConfig } from 'swr'
import Typography from '@material-ui/core/Typography'
import VideoManageTable from 'src/components/video/VideoManageTable'
import Tips from 'src/atoms/Tips'
import Spinner from 'src/atoms/Spinner'
import { GetStaticProps } from 'next'
import {
	getVideos,
	getCategories,
	getTags,
	getPaths,
	getUsers,
	getVideoRows,
} from 'src/data/fetcher'

interface IPage {
	errors?: string
	fallback
}

const VideoPage: React.FC<IPage> = (props) => {
	/** validate */
	if (props.errors)
		return <p style={{ color: 'red' }}>Errors:{props.errors}</p>

	return (
		<SWRConfig value={props.fallback}>
			<Typography variant="h5" component="h2" gutterBottom>
				動画コンテンツ一覧
			</Typography>
			<VideoManageTable />
			<Tips />
			<Spinner />
		</SWRConfig>
	)
}
export default VideoPage

/**
 * SSG: Get Videos, Categories, Tags, LearningPaths
 * @returns props
 */
export const getStaticProps: GetStaticProps = async () => {
	try {
		const videos = await getVideos('/videos?open=false')
		const categories = await getCategories('/categories')
		const tags = await getTags('/tags')
		const paths = await getPaths('/paths')
		const users = await getUsers('/users')
		const videoRows = await getVideoRows(
			'/table/videos',
			videos,
			categories,
			tags,
			paths,
			users
		)
		return {
			props: {
				fallback: {
					'/videos': videos,
					'/categories': categories,
					'/tags': tags,
					'/paths': paths,
					'/users': users,
					'/table/videos': videoRows,
				},
			},
		}
	} catch (err) {
		console.error(err.message)
		return { props: { errors: err.message } }
	}
}
