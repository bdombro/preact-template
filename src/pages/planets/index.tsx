import {useEffect} from 'react'

import {Layout} from '~/components/layout-default'
import {router as r} from '~/util/router'

export default function Planets() {
  useEffect(() => r.replace(r.routes.planetsByPage, {page: '1'}), [])
  return (
    <Layout>
      <></>
    </Layout>
  )
}
