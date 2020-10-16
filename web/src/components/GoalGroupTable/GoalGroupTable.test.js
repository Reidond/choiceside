import { render } from '@redwoodjs/testing'

import GoalGroupTable from './GoalGroupTable'

describe('GoalGroupTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GoalGroupTable />)
    }).not.toThrow()
  })
})
