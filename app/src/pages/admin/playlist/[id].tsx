import * as React from 'react'
import _ from 'lodash'
import { SWRConfig } from 'swr'
import { getPath, getPaths, getVideos } from 'src/data/fetcher'
import { GetStaticPaths, GetStaticProps } from 'next'

import PathDetail from 'src/components/path/PathDetail'
import Tips from 'src/atoms/Tips'
import Spinner from 'src/atoms/Spinner'

interface Props {
	errors?: string
	fallback
}

const DetailPage: React.FC<Props> = (props) => {
	/** validate */
	if (props.errors)
		return (
			<div>
				最新の情報じゃないかもしれません。。リロードしてみて下さい。
			</div>
		)

	return (
		<SWRConfig value={props.fallback}>
			<div style={{ maxWidth: '80%' }}>
				<PathDetail />
				<Tips />
				<Spinner />
			</div>
		</SWRConfig>
	)
}
export default DetailPage

/**
 * SSG: ビルド時にレンダリングするPathを生成する
 */
export const getStaticPaths: GetStaticPaths = async () => {
	const _paths = await getPaths('/paths')
	const paths = _paths.map((item) => {
		return { params: { id: item.PK } }
	})
	return { paths, fallback: 'blocking' }
	// SSGしない
	// return { paths, fallback: "true" }
}

/**
 * SSG: 各ページのパラメータをPageコンポーネントに渡す
 * Pageコンポーネントはパラメータをpropsで受け取る
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const pathUrl = `/path/${params.id}`
		const path = await getPath(pathUrl)
		const videos = await getVideos('/videos?open=false')
		return {
			props: {
				fallback: {
					pathUrl: path,
					'/videos?open=false': videos,
				},
			},
			revalidate: 120,
		}
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
