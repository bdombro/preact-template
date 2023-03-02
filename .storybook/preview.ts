import '~/styles.pcss'

import '~/util/polyfills'

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
