import type { RouteMatch } from '~/stackr'
import useSwr from '~/swr'
import * as sw from '~/swapi'
import { router } from '~/router'
import { LayoutDefault } from '~/components/layout-default'

export default function PlanetsByPage({ route }: { route: RouteMatch }) {
  const page = route.urlParams!.page
  console.log(page)
  const data = useSwr({
    fetcher: (_page: typeof page) => sw.Planets.getPage(Number(_page)),
    props: [page],
  })

  return (
    <LayoutDefault>
      <h1>Page: {page}</h1>
      <button
        onClick={() => data.refresh()}
        disabled={data.loading}
        type="button"
      >
        Refetch
      </button>
      <button
        disabled={page === '1'}
        onClick={() => {
          router.goto(route, { page: `${Number(page) - 1}` })
        }}
        type="button"
      >
        Prior Page
      </button>
      <button
        onClick={() => {
          router.goto(route, { page: `${Number(page) + 1}` })
        }}
        type="button"
      >
        Next Page
      </button>
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
    </LayoutDefault>
  )
}
