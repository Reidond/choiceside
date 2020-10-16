import { render } from '@redwoodjs/testing'

import NumberGroupIndicator from './NumberGroupIndicator'

describe('NumberGroupIndicator', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NumberGroupIndicator />)
    }).not.toThrow()
  })
})
