import {ErrorDialog} from './components/error-dialog'
import './components/primitives'
import {ServiceWorkerDialog} from './components/service-worker-dialog'
import {router} from './util/router'
import {Switch} from './util/stackr'
import './util/styles.pcss'

export function App() {
  return (
    <div data-testid="appComponent">
      <Switch router={router} />
      <ErrorDialog />
      <ServiceWorkerDialog />
    </div>
  )
}
