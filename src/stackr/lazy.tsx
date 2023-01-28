/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react'

export function Lazy({
  loader,
  props = {},
  onLoad = () => {},
}: {
  /**
   * A callback that loads a Svelte component, i.e.
   * ```typescript
   * () => import('./Index.svelte')`
   * ```
   */
  loader: () => Promise<any>
  /**
   * Props to be passed to the loaded component
   */
  props?: any
  /**
   * Callback to be called when the component is loaded
   */
  onLoad?: () => void
}) {
  /**
   * The loaded component: undefined while loading
   */

  const [state, setState] = useState<{
    /** A loaded module. Default = cache. Without cache, back scroll restore would fail. */
    module: any
    /** Props for the module */
    props: any
  }>()

  useEffect(() => {
    loader().then((m) => {
      if (!m) return
      setState({ module: m, props })
      onLoad()
    })
  }, [loader, props])

  useEffect(() => state?.module && onLoad(), [state])

  return useMemo(() => state?.module?.default(state?.props), [state])
}
