import * as React from 'react'
import { SWRConfig } from 'swr'
import Typography from '@material-ui/core/Typography'
import CategoryManageTable from 'src/components/category/CategoryManageTable'
import Tips from 'src/atoms/Tips'
import Spinner from 'src/atoms/Spinner'

import { getCategories } from 'src/data/fetcher'
import { GetStaticProps } from 'next'

interface IPage {
	errors?: string
	fallback
}

const CategoryPage: React.FC<IPage> = (props) => {
	/** validate */
	if (props.errors)
		return <p style={{ color: 'red' }}>Errors:{props.errors}</p>

	return (
		<SWRConfig value={props.fallback}>
			<Typography variant="h5" component="h2" gutterBottom>
				カテゴリ一覧
			</Typography>
			<CategoryManageTable />
			<Tips />
			<Spinner />
		</SWRConfig>
	)
}
export default CategoryPage

/**
 * SSG: Get Categories
 * @returns props
 */
export const getStaticProps: GetStaticProps = async () => {
	try {
		const categories = await getCategories('/categories')
		return {
			props: {
				fallback: {
					'/categories': categories,
				},
			},
		}
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
