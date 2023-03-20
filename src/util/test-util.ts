import '../foundation/polyfills'

import {setPageMeta} from '@slimr/util'
import '@testing-library/jest-dom'
import {cleanup} from '@testing-library/react'
import {afterEach, vi} from 'vitest'

setPageMeta.testMode = true

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

// import {render} from '@testing-library/react'
// const customRender = (ui: any, options = {}) =>
//   render(ui, {
//     // Wrap provider(s) here if needed
//     wrapper: ({children}: any): any => children,
//     ...options,
//   })
// Override render export
// export {customRender as render}

export * from '@testing-library/react'
export * from 'vitest'
export {default as userEvent} from '@testing-library/user-event'

export * from '@storybook/testing-react'
