import './foundation.pcss'

import './polyfills'

import {Device} from '@capacitor/device'

/**
 * Set the CSS variable `--dvh` to the height of the viewport.
 *
 * Is more reliable than `100vh` because it takes into account the height of
 * the browser's UI elements (e.g. address bar, status bar, etc).
 */
const resizeObserver = new ResizeObserver(() => {
  document.documentElement.style.setProperty('--dvh', `${window.innerHeight}px`)
})
resizeObserver.observe(document.documentElement)

/**
 * Status bar is the upper bar showing time, battery, etc on mobile devices.
 *
 * When the app is running in a browser, the content is rendered below the
 * status bar. But in capacitor, the content is rendered behind the status
 * bar. So we track the platform and set a CSS variable to adjust the layout
 * accordingly.
 */
Device.getInfo().then(info => {
  if (info.platform !== 'web') {
    document.documentElement.style.setProperty('--statusbar-height', '40px')
  }
})

export * from './cards'
export * from './forms'
export * from './icons'
export * from './toasts'
