import './foundation.pcss'

import './polyfills'

import {Device} from '@capacitor/device'
import {debounce} from '@slimr/util'

declare global {
  interface Navigator {
    msMaxTouchPoints: number
  }
  interface Window {
    isSoftKeyboardOpen: boolean
    isTouchEnabled: boolean
    os: Os
    capacitorPlatform: Platform
    prefersDark: boolean
  }
}

/**
 * Add Capacitor platform when available. Can be web, ios, or android. Does not
 * indicate operating system if running in a browser vs native app.
 *
 * Is useful for styling platform-specific elements when running in capacitor.
 */
Device.getInfo().then(info => {
  window.capacitorPlatform = info.platform as Platform
  document.documentElement.classList.add(`capacitor-platform-${info.platform}`)
})
enum Platform {
  android = 'android',
  ios = 'ios',
  web = 'web',
}

/**
 * Detect if touch screen is enabled.
 */
window.isTouchEnabled =
  'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
document.documentElement.classList.add('touch')

/**
 * Detect the operating system via Browser API.
 */
enum Os {
  android = 'android',
  iphone = 'iphone',
  ipad = 'ipad',
  linux = 'linux',
  macintosh = 'mac',
  unix = 'unix',
  unknown = 'unknown',
  windows = 'windows',
}
window.os = Os.unknown
const av = navigator.appVersion
if (av.includes('Android')) {
  window.os = Os.android
} else if (av.includes('iPhone')) {
  window.os = Os.iphone
} else if (av.includes('Linux')) {
  window.os = Os.linux
} else if (av.includes('Macintosh')) {
  if (window.isTouchEnabled) {
    window.os = Os.ipad
  } else {
    window.os = Os.macintosh
  }
} else if (av.includes('Windows')) {
  window.os = Os.windows
} else if (av.includes('X11')) {
  window.os = Os.unix
}
// alert('ontouchstart' in window ? 'true' : 'false')
document.documentElement.classList.add(`os-${window.os}`)

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
    window.prefersDark = true
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#333')
    document.documentElement.classList.add('prefers-dark')
  } else {
    window.prefersDark = false
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
      window.isSoftKeyboardOpen = true
      document.documentElement.classList.add('keyboard-open')
    } else {
      window.isSoftKeyboardOpen = false
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
