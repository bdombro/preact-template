import type { RouteMatch } from '~/stackr'
import useSwr from '~/swr'
import * as sw from '~/swapi'
import { router } from '~/router'
import { Layout } from '~/components/layout-default'
import { Fragment as F } from 'react'

export default function PlanetsByPage({ route }: { route: RouteMatch }) {
  const page = route.urlParams!.page

  const data = useSwr({
    fetcher: (_page: typeof page) => sw.Planets.getPage(Number(_page)),
    props: [page],
  })

  return (
    <Layout>
      <Layout.Section>
        <h1>Page: {page}</h1>
        <button
          id="refetch-page"
          onClick={() => data.refresh()}
          disabled={data.loading}
          type="button"
        >
          Refetch
        </button>
        <button
          id="goto-prior-page"
          disabled={page === '1'}
          onClick={() => {
            router.goto(route, { page: `${Number(page) - 1}` })
          }}
          type="button"
        >
          Prior Page
        </button>
        <button
          id="goto-next-page"
          onClick={() => {
            router.goto(route, { page: `${Number(page) + 1}` })
          }}
          type="button"
        >
          Next Page
        </button>
        {data.result?.map((planet) => (
          <F key={planet.name}>
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
          </F>
        ))}
      </Layout.Section>
    </Layout>
  )
}
