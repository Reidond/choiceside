import { render } from '@redwoodjs/testing'

import AlternativesNumberX from './AlternativesNumberX'

describe('AlternativesNumberX', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AlternativesNumberX />)
    }).not.toThrow()
  })
})
