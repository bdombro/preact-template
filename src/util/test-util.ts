import '@testing-library/jest-dom'
import {cleanup, render} from '@testing-library/preact'
import {afterEach, vi} from 'vitest'

afterEach(() => {
	cleanup()
	vi.resetAllMocks()
})

const customRender = (ui: any, options = {}) =>
	render(ui, {
		// Wrap provider(s) here if needed
		wrapper: ({children}: any): any => children,
		...options,
	})

export * from '@testing-library/preact'
export * from 'vitest'
export {default as userEvent} from '@testing-library/user-event'
// Override render export
export {customRender as render}
