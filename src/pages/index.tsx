import {setPageMeta} from '@slimr/util'

import {Filler} from '~/comps/filler'
import {Layout} from '~/comps/layout-default'

/**
 * A demo of a home page
 */
export default function Index() {
  const {title, description} = setPageMeta({title: 'Home'})
  return (
    <Layout>
      <Layout.Section>
        <h1>{title}</h1>
        <p>{description}</p>
        <button
          id="test-error-boundary"
          onClick={async () => {
            throw new Error('This is a test error.')
          }}
          style={{marginBottom: '1rem'}}
          type="button"
        >
          Click to test error boundary
        </button>
        <Filler />
      </Layout.Section>
    </Layout>
  )
}
