import {render, screen} from '~/util/test-util.js'
import {Body} from './body.js'

it('renders', () => {
  render(<Body />)
  expect(
    screen.getByRole('heading', {
      name: /Hello, world/,
      level: 1,
    }),
  ).toBeInTheDocument()
})
