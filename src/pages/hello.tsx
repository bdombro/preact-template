import type { RouteMatch } from '~/stackr'
import { Layout } from '~/components/layout-default'
import { Filler } from '~/components/filler'

export default function Hello({ route }: { route: RouteMatch }) {
  return (
    <Layout>
      <Layout.Section>
        <h1>Hello, {route.urlParams!.name}.</h1>
        <Filler />
      </Layout.Section>
    </Layout>
  )
}
