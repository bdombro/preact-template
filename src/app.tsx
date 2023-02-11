import './styles.pcss'

import './util/polyfills/web'

import {router} from './router'
import {Switch} from './util/stackr'
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
