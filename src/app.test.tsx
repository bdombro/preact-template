import {render, screen} from '~/util/test-util.js'
import {App} from './app.js'

it('renders', () => {
  render(<App />)
  expect(screen.getByTestId('appComponent')).toBeInTheDocument()
})
