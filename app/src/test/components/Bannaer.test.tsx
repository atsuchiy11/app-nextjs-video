import * as React from 'react'
import { cleanup, render } from '../testUtils'
import Banner from 'src/components/view/Banner'

describe('Uniit: Banner', () => {
	afterEach(cleanup)

	it('matches snapshot', () => {
		const { asFragment } = render(<Banner />, {})
		expect(asFragment()).toMatchSnapshot()
	})

	it('show banner', () => {
		const { getAllByTestId } = render(<Banner />, {})
		const preCount = 6
		expect(getAllByTestId('banner')).toHaveLength(preCount)
		expect(getAllByTestId('banner-image')).toHaveLength(preCount)
		expect(getAllByTestId('banner-title')).toHaveLength(preCount)
		expect(getAllByTestId('banner-text')).toHaveLength(preCount)
	})
})
