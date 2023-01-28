import { Layout } from '~/components/layout-default'
import { Filler } from '~/components/filler'

export default function StackTest({ url }: { url: URL }) {
  return (
    <Layout>
      <Layout.Section>
        <h1>{url.pathname}</h1>
        <a href={`${url.pathname}/inner`}>Inner page</a>
        <Filler />
      </Layout.Section>
    </Layout>
  )
}
