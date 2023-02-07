import {Layout} from '~/components/layout-default'
import {router as r} from '~/router'

export default function Planets() {
  useEffect(() => r.replace(r.routes.planetsByPage, {page: '1'}), [])
  return (
    <Layout>
      <></>
    </Layout>
  )
}
