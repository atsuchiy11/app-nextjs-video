import * as React from 'react'
import { SWRConfig } from 'swr'
import Typography from '@material-ui/core/Typography'
import TagManageTable from 'src/components/tag/TagManageTable'
import Tips from 'src/atoms/Tips'
import Spinner from 'src/atoms/Spinner'

import { getTags } from 'src/data/fetcher'
import { GetStaticProps } from 'next'

interface IPage {
	errors?: string
	fallback
}

const TagPage: React.FC<IPage> = (props) => {
	/** validate */
	if (props.errors)
		return <p style={{ color: 'red' }}>Errors:{props.errors}</p>

	return (
		<SWRConfig value={props.fallback}>
			<Typography variant="h5" component="h2" gutterBottom>
				タグ一覧
			</Typography>
			<TagManageTable />
			<Tips />
			<Spinner />
		</SWRConfig>
	)
}
export default TagPage

/**
 * SSG: get tags from db
 * @returns props
 */
export const getStaticProps: GetStaticProps = async () => {
	try {
		const tags = await getTags('/tags')
		return {
			props: {
				fallback: { '/tags': tags },
			},
		}
	} catch (err) {
		console.error(err.message)
		return { props: { errors: err.message } }
	}
}
