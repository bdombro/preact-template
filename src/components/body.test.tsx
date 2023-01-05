import {render, screen} from '~/util/test-util'
import {Body} from './body'

it('renders', () => {
	render(<Body />)
	expect(
		screen.getByRole('heading', {
			name: /Hello, world./,
			level: 1,
		}),
	).toBeInTheDocument()
})
