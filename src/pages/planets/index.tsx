import { router as r } from '~/router'
import { Layout } from '~/components/layout-default'
import { useEffect } from 'react'

export default function Planets() {
  useEffect(() => r.replace(r.routes.planetsByPage, { page: '1' }), [])
  return (
    <Layout>
      <></>
    </Layout>
  )
}
