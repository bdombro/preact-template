import type { RouteMatch } from '~/stackr'
import { LayoutDefault } from '~/components/layout-default'
import { Filler } from '~/components/filler'

export default function Hello({ route }: { route: RouteMatch }) {
  return (
    <LayoutDefault>
      <h1>Hello, {route.urlParams!.name}.</h1>
      <Filler />
    </LayoutDefault>
  )
}
