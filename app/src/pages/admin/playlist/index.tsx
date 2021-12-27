import * as React from 'react'
import { SWRConfig } from 'swr'
import Typography from '@material-ui/core/Typography'
import PathManageTable from 'src/components/path/PathManageTable'
import Tips from 'src/atoms/Tips'

import { GetStaticProps } from 'next'
import { getPaths } from 'src/data/fetcher'

interface IPage {
	errors?: string
	fallback
}

const LearningPathPage: React.FC<IPage> = (props) => {
	/** validate */
	if (props.errors)
		return <p style={{ color: 'red' }}>Errors:{props.errors}</p>

	return (
		<SWRConfig value={props.fallback}>
			<Typography variant="h5" component="h2" gutterBottom>
				再生リスト一覧
			</Typography>
			<PathManageTable />
			<Tips />
		</SWRConfig>
	)
}
export default LearningPathPage

/**
 * SSG: Get Learning-Paths
 * @returns props
 */
export const getStaticProps: GetStaticProps = async () => {
	try {
		const paths = await getPaths('/paths')
		return {
			props: {
				fallback: {
					'/paths': paths,
				},
			},
		}
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
