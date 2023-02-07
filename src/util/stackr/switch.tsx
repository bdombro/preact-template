import {Lazy} from './lazy'
import type {RouterInstance} from './router-class'

export function Switch({router}: {router: RouterInstance}) {
  const [route, setRoute] = useState(router.find(new URL(location.href)))

  useEffect(() => router.subscribe(setRoute), [])

  return (
    <Lazy
      loader={route.loader}
      props={{route, url: new URL(location.href)}}
      onLoad={router.onLoad}
    />
  )
}
