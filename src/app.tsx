import './styles.pcss'

import './util/polyfills/web'

import {BrowserCheckToast} from './comps/browser-check-toast'
import {ErrorToast} from './comps/error-toast'
import {OfflineToast} from './comps/offline-toast'
import {ServiceWorkerToasts} from './comps/service-worker-toasts'
import {Toasts} from './comps/toast'
import {router} from './router'
import {Switch} from './util/stackr'

/**
 * The main app component
 */
export function App() {
  return (
    <div data-testid="appComponent">
      <Toasts />
      <BrowserCheckToast />
      <ErrorToast />
      <OfflineToast />
      <ServiceWorkerToasts />
      <Switch router={router} />
    </div>
  )
}
