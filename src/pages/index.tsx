import {Filler} from '~/components/filler'
import {Layout} from '~/components/layout-default'
import {setPageMeta} from '~/util/page-meta'

export default function Index() {
  const {title, description} = setPageMeta({title: 'Home'})
  return (
    <Layout>
      <Layout.Section>
        <H1>{title}</H1>
        <p>{description}</p>
        <button
          id="test-error-boundary"
          onClick={async () => {
            throw new Error('test')
          }}
          type="button">
          Click to test error boundary
        </button>
        <Filler />
      </Layout.Section>
    </Layout>
  )
}
