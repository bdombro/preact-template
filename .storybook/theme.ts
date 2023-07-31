import {create} from '@storybook/theming/create'

const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches // true

export default create({
  base: prefersDarkMode ? 'dark' : 'light',
  brandTitle: 'dispatcher-chat',
  brandUrl: 'https://github.com/bdombro/dispatcher-chat',
  // brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
  brandTarget: '_blank',
})
