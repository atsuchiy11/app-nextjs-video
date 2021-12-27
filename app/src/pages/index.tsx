import * as React from 'react'
import { SWRConfig } from 'swr'
import TagGridList from 'src/components/view/TagGridList'
import VideoGridList from 'src/components/view/VideoGridList'
import { GetStaticProps } from 'next'
import { getVideos, getTags, getPaths, getCategories } from 'src/data/fetcher'
import { useHistory } from 'src/foundations/hooks'
import useFavorite from 'src/components/player/useFavorite'
import useSearch from 'src/components/view/useSearch'

interface IPage {
	errors?: string
	fallback
}

/**
 * index page
 * @param props
 * @returns JSX.Element
 */
const IndexPage: React.FC<IPage> = (props) => {
	useSearch()

	const { data: history, error: historyError } = useHistory()
	const { favorite, favoriteError } = useFavorite()

	/** validate */
	if (props.errors)
		return <p style={{ color: 'red' }}>Errors:{props.errors}</p>
	if (historyError) return <div>failed to load history.</div>
	if (favoriteError) return <div>failed to load favorite.</div>
	if (!history || !favorite) return <div>loading...</div>

	return (
		<SWRConfig value={props.fallback}>
			<TagGridList />
			<VideoGridList />
		</SWRConfig>
	)
}
export default IndexPage

/**
 * SSG: Get Videos & Paths & Tags
 * @returns
 */
export const getStaticProps: GetStaticProps = async () => {
	try {
		const videos = await getVideos('/videos')
		const paths = await getPaths('/paths')
		const tags = await getTags('/tags')
		const categories = await getCategories('/categories')
		return {
			props: {
				fallback: {
					'/videos': videos,
					'/paths': paths,
					'/tags': tags,
					'/categories': categories,
				},
			},
		}
	} catch (err) {
		console.log(err)
		return { props: { errors: err.messsage } }
	}
}
