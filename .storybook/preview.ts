import './preview.css'

import '~/util/polyfills'

import '~/foundation'

import Theme from './theme'

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: Theme,
  },
}
