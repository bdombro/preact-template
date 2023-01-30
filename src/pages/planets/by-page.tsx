import type { RouteMatch } from '~/util/stackr'
import useSwr from '~/util/swr'
import * as sw from '~/util/swapi'
import { setPageMeta } from '~/util/page-meta'
import { router } from '~/util/router'
import { Layout } from '~/components/layout-default'
import { Fragment as F } from 'react'

export default function PlanetsByPage({ route }: { route: RouteMatch }) {
  const page = route.urlParams!.page

  const { title, description } = setPageMeta({
    title: `Planets Page ${page}`,
    description: `A demo of a route stack and data fetching. Notice that it takes a moment to load the data at first, but then you never wait for the same data to load twice. Also notice that the page state is restored when you navigate to another page in the nav menu and return.`,
  })

  const data = useSwr({
    fetcher: (_page: typeof page) => sw.Planets.getPage(Number(_page)),
    props: [page],
    throttle: Infinity,
  })

  return (
    <Layout>
      <Layout.Section>
        <h1>{title}</h1>
        <p>{description}</p>
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
        {data.loading && <p>Loading...</p>}
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
