import type {RouteMatch} from '@slimr/router'
import {setPageMeta} from '@slimr/util'

import {Layout} from '~/layout/layout-default'

/**
 * A demo of route with url params
 */
export default function Hello({route}: {route: RouteMatch}) {
  const {title, description} = setPageMeta({
    title: `Hello ${route.urlParams!.name}`,
    description: 'A demo of route with url params.',
  })
  return (
    <Layout>
      <Layout.Section>
        <h1>{title}</h1>
        <p>{description}</p>
      </Layout.Section>
    </Layout>
  )
}
