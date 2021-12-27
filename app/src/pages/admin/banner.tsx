import * as React from 'react'
import { SWRConfig } from 'swr'
import Typography from '@material-ui/core/Typography'
import BannerManageTable from 'src/components/banner/BannerManageTable'
import Tips from 'src/atoms/Tips'

import { GetStaticProps } from 'next'
import { getBanners } from 'src/data/fetcher'

interface IPage {
	errors?: string
	fallback
}

const BannerPage: React.FC<IPage> = (props) => {
	/** validate */
	if (props.errors)
		return <p style={{ color: 'red' }}>Errors:{props.errors}</p>

	return (
		<SWRConfig value={props.fallback}>
			<Typography variant="h5" component="h2" gutterBottom>
				バナー一覧
			</Typography>
			<BannerManageTable />
			<Tips />
		</SWRConfig>
	)
}
export default BannerPage

/**
 * SSG: get banners from db
 * @returns props
 */
export const getStaticProps: GetStaticProps = async () => {
	try {
		const banners = await getBanners('/banners')
		return {
			props: {
				fallback: {
					'/banners': banners,
				},
			},
		}
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
