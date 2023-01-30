import './util/styles.pcss'
import './components/primitives'
import { Switch } from './util/stackr'
import { router } from './util/router'
import { ErrorDialog } from './components/error-dialog'

export function App() {
  return (
    <div data-testid="appComponent">
      <Switch router={router} />
      <ErrorDialog />
    </div>
  )
}
