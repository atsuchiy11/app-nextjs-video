import * as React from 'react'
import { SWRConfig } from 'swr'
import Typography from '@material-ui/core/Typography'
import UserManageTable from 'src/components/user/UserManageTable'
import Tips from 'src/atoms/Tips'

import { GetStaticProps } from 'next'
import { getUsers } from 'src/data/fetcher'

interface IPage {
	errors?: string
	fallback
}

const UserPage: React.FC<IPage> = (props) => {
	/** validate */
	if (props.errors)
		return <p style={{ color: 'red' }}>Errors:{props.errors}</p>

	return (
		<SWRConfig value={props.fallback}>
			<Typography variant="h5" component="h2" gutterBottom>
				ユーザ一覧
			</Typography>
			<UserManageTable />
			<Tips />
		</SWRConfig>
	)
}
export default UserPage

/**
 * SSG: get user from db
 * @returns props
 */
export const getStaticProps: GetStaticProps = async () => {
	try {
		const users = await getUsers('/users')
		return {
			props: {
				fallback: {
					'/users': users,
				},
			},
		}
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
