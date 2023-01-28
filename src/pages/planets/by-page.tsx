import type { RouteMatch } from '~/stackr'
import useSwr from '~/swr'
import * as sw from '~/swapi'
import { router } from '~/router'
import { Layout } from '~/components/layout-default'

export default function PlanetsByPage({ route }: { route: RouteMatch }) {
  const page = route.urlParams!.page
  console.log(page)
  const data = useSwr({
    fetcher: (_page: typeof page) => sw.Planets.getPage(Number(_page)),
    props: [page],
  })

  return (
    <Layout>
      <Layout.Section>
        <h1>Page: {page}</h1>
        <Button
          id="refetch-page"
          onClick={() => data.refresh()}
          disabled={data.loading}
          type="button"
        >
          Refetch
        </Button>
        <Button
          id="goto-prior-page"
          disabled={page === '1'}
          onClick={() => {
            router.goto(route, { page: `${Number(page) - 1}` })
          }}
          type="button"
        >
          Prior Page
        </Button>
        <Button
          id="goto-next-page"
          onClick={() => {
            router.goto(route, { page: `${Number(page) + 1}` })
          }}
          type="button"
        >
          Next Page
        </Button>
        {data?.result?.map((planet) => (
          <>
            <h3>{planet.name}</h3>
            <ul>
              {Object.entries(planet)
                .slice(1)
                .map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
            </ul>
          </>
        ))}
      </Layout.Section>
    </Layout>
  )
}
