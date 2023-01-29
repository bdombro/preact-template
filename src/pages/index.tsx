import { Layout } from '~/components/layout-default'

export default function Index() {
  return (
    <Layout>
      <Layout.Section>
        <H1>Home</H1>
        <button
          id="test-error-boundary"
          onClick={async () => {
            throw new Error('test')
          }}
          type="button"
        >
          Test Error Boundary
        </button>
      </Layout.Section>
    </Layout>
  )
}
