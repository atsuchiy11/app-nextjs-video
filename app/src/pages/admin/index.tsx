import * as React from 'react'
import { GetStaticProps } from 'next'
import { SWRConfig } from 'swr'

import StatusGridList from 'src/components/admin/StatusGridList'
import StatusTable from 'src/components/admin/StatusTable'
import Typography from '@material-ui/core/Typography'

import {
	getCategoryCount,
	getHistoryCount,
	getLoginUsers,
	getPathCount,
	getStatus,
	getTagCount,
	getUserCount,
	getVideoCount,
} from 'src/data/fetcher'

interface IPage {
	errors?: string
	fallback
}

const AdminPage: React.FC<IPage> = (props) => {
	/** validate */
	if (props.errors)
		return <p style={{ color: 'red' }}>Errors:{props.errors}</p>

	return (
		<SWRConfig value={props.fallback}>
			<Typography variant="h5" component="h2" gutterBottom>
				ダッシュボード
			</Typography>
			<StatusGridList />
			<StatusTable />
		</SWRConfig>
	)
}
export default AdminPage

/**
 * SSG: Get Status
 * @returns props
 */
export const getStaticProps: GetStaticProps = async () => {
	try {
		const status = await getStatus('/upload/status')
		const videos = await getVideoCount('/videos?open=false&count=true')
		const tags = await getTagCount('/tags?count=true')
		const categories = await getCategoryCount('/categories?count=true')
		const paths = await getPathCount('/paths?count=true')
		const users = await getUserCount('/users?count=true')
		const histories = await getHistoryCount('/histories?count=true')
		const login = await getLoginUsers('/users/login')

		return {
			props: {
				fallback: {
					'/upload/status': status,
					'/videos?open=false&count=true': videos,
					'/tags?count=true': tags,
					'/categories?count=true': categories,
					'/paths?count=true': paths,
					'/users?count=true': users,
					'/histories?count=true': histories,
					'/users/login': login,
				},
			},
		}
	} catch (err) {
		console.error(err.message)
		return { props: { errors: err.message } }
	}
}
