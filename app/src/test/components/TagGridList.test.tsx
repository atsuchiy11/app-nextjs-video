import * as React from 'react'
import { cleanup, render, fireEvent } from '../testUtils'
import TagGridList from 'src/components/view/TagGridList'

describe('Unit: TagGridList', () => {
	afterEach(cleanup)

	it('matches snapshot', () => {
		const { asFragment } = render(<TagGridList />, {})
		expect(asFragment()).toMatchSnapshot()
	})

	it('show arrow icon for scroll', () => {
		const { getAllByTestId } = render(<TagGridList />, {})
		expect(getAllByTestId('arrow-icon')).toHaveLength(2)
	})

	it('clicked any tag, show alert', () => {
		const { getAllByTestId } = render(<TagGridList />, {})
		// 0~タグ数の範囲で乱数を生成
		const num = Math.floor(
			Math.random() * (getAllByTestId('chip').length + 1)
		)
		const label = getAllByTestId('chip')[num].textContent
		const alert = `タグ「${label}」で絞り込みます`

		window.alert = jest
			.fn()
			.mockImplementationOnce(() => window.alert(alert))

		fireEvent.click(getAllByTestId('chip')[num])
		expect(window.alert).toHaveBeenCalledWith(alert)
	})
})
