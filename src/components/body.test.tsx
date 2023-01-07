import { composeStories, render, screen } from '~/util/test-util.js'
import * as stories from './body.stories.js'

const { Body } = composeStories(stories)

it('renders', () => {
  render(<Body />)
  expect(
    screen.getByRole('heading', {
      name: /Hello, world/,
      level: 1,
    })
  ).toBeInTheDocument()
})
