import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Home from '../src/pages/index'

describe( 'Home', () => {
	it( 'Should render', () => {
		render( <Home /> )

		const title = screen.getByTestId( 'title' )

		const e = expect( title )

		expect( title ).toHaveTextContent( 'Hello World' )
	} )
} )
