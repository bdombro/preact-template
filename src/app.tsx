import './styles.pcss'
import './components/primitives'
import { Switch } from './stackr'
import { router } from './router'
import { ErrorDialog } from './components/error-dialog'

export function App() {
  return (
    <div data-testid="appComponent">
      <Switch router={router} />
      <ErrorDialog />
    </div>
  )
}
