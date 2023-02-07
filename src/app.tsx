import './util/styles.pcss'

import './util/polyfills/web'

// for dev
// import 'preact/debug'
// for prod
import 'preact/devtools'

import {ErrorToast} from './components/error-toast'
import {OfflineToast} from './components/offline-toast'
import {ServiceWorkerToasts} from './components/service-worker-toasts'
import {Toasts} from './components/toast'
import {router} from './router'
import {Switch} from './util/stackr'

export function App() {
  return (
    <div data-testid="appComponent">
      <Toasts />
      <ErrorToast />
      <OfflineToast />
      <ServiceWorkerToasts />
      <Switch router={router} />
    </div>
  )
}
