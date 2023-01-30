import { setPageMeta } from '~/util/page-meta'
import { Layout } from '~/components/layout-default'

export default function NotFound() {
  const { description } = setPageMeta({
    title: 'Not Found',
    description: '404 - Page not found',
  })
  return (
    <Layout>
      <Layout.Section>
        <h1>{description}</h1>
        <img alt="middle of ocean" src="/notfound.png" />
      </Layout.Section>
    </Layout>
  )
}
