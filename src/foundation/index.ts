import './foundation.pcss'

import './polyfills'

import {Device} from '@capacitor/device'
import {debounce} from '@slimr/util'

/**
 * Status bar is the upper bar showing time, battery, etc on mobile devices.
 *
 * When the app is running in a browser, the content is rendered below the
 * status bar. But in capacitor, the content is rendered behind the status
 * bar. So we track the platform and set a CSS variable to adjust the layout
 * accordingly.
 */
Device.getInfo().then(info => {
  document.documentElement.classList.add(`platform-${info.platform}`)
})

/**
 * Add a class to the documentElement when the app is running in chrome
 */
if ('chrome' in window) {
  document.documentElement.classList.add('browser-chrome')
} else {
  document.documentElement.classList.add('browser-unknown')
}

/**
 * Add a class to the documentElement when the user has requested a dark theme
 * and update the meta theme-color tag
 */
const prefersDarkMatchMedia = matchMedia('(prefers-color-scheme: dark)')
const prefersDarkListener = (e: {matches: boolean}) => {
  if (e.matches) {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#333')
    document.documentElement.classList.add('prefers-dark')
  } else {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fff')
    document.documentElement.classList.remove('prefers-dark')
  }
}
prefersDarkListener(prefersDarkMatchMedia)
prefersDarkMatchMedia.addEventListener('change', prefersDarkListener)

/**
 * Set the CSS variable `--dvh` to the height of the viewport.
 *
 * Is more reliable than `100vh` because it takes into account the height of
 * the browser's UI elements (e.g. address bar, status bar, etc).
 */
if (!('chrome' in window)) {
  const setViewportHeight = () => {
    document.documentElement.style.setProperty('--dvh', `${window.innerHeight}px`)
  }
  setViewportHeight()
  addEventListener('resize', debounce(setViewportHeight))
}

/**
 * Add a class to the documentElement when the soft keyboard is open. Is
 * useful for hiding the footer when the keyboard is open.
 *
 * We detect this by comparing the window's outerHeight to its innerHeight.
 */
const softKeyboardListener = () => {
  setTimeout(() => {
    if (window.outerHeight - window.innerHeight > 300) {
      document.documentElement.classList.add('keyboard-open')
    } else {
      document.documentElement.classList.remove('keyboard-open')
    }
  }, 200) // 50 is the minimum delay that works on iOS
}
addEventListener('focusin', softKeyboardListener)
addEventListener('focusout', softKeyboardListener)

export * from './cards'
export * from './forms'
export * from './icons'
export * from './toasts'
