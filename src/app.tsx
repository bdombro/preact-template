import './styles.pcss'

import './util/polyfills'

import {Switch} from '@slimr/router'

import {router} from './router'
import {ToastPack} from './util/toasts'

/**
 * The main app component
 */
export function App() {
  return (
    <div data-testid="appComponent">
      <ToastPack />
      <Switch router={router} />
    </div>
  )
}
