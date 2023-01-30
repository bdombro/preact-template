import type { RouteMatch } from '~/stackr'
import { setPageMeta } from '~/util/page-meta'
import { Layout } from '~/components/layout-default'
import { Filler } from '~/components/filler'

export default function Hello({ route }: { route: RouteMatch }) {
  const { description } = setPageMeta({
    title: 'Home',
    description: 'A demo of route with url params.',
  })
  return (
    <Layout>
      <Layout.Section>
        <h1>Hello, {route.urlParams!.name}.</h1>
        <p>{description}</p>
        <Filler />
      </Layout.Section>
    </Layout>
  )
}
