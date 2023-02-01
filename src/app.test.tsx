import {render, screen} from '~/util/test-util'

import {App} from './app'

it('renders', () => {
  render(<App />)
  expect(screen.getByTestId('appComponent')).toBeInTheDocument()
})
