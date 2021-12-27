import React from 'react'
import { render, fireEvent } from '../testUtils'
import Message from 'src/atoms/Message'

describe('Home page', () => {
	it('show message', () => {
		const messageRender = render(<Message />, {})
		expect(messageRender.getAllByText('message!')).toHaveLength(1)
	})

	it('matches snapshot', () => {
		const { asFragment } = render(<Message />, {})
		expect(asFragment()).toMatchSnapshot()
	})

	it('clicked button', () => {
		const { getByText } = render(<Message />)
		window.alert = jest.fn()
		fireEvent.click(getByText('button'))
		expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
	})
})
