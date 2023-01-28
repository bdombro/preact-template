/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *
 * useSwr: a tiny (600B) async resolver that displays a cached version (if available) of the
 * callback until the callback resolves.
 *
 * Tiny: only 600 bytes when bundled with Vite
 *
 */

import { useState } from 'react'

/** A generic promise */
type P = (...args: any[]) => Promise<any>
type PNoArgs = () => Promise<any>
/** Gets the return type of a promise */
type ReturnTypeP<T extends P> = ThenArg<ReturnType<T>>
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

/** The state of a fetcher */
export interface CacheVal<T extends P> {
  /** A Normal JS error that is populated on error */
  error?: Error
  /** Any outstanding promise for fetching new data */
  p?: ReturnType<T>
  /** The last time this cache item was refreshed */
  t?: number
  /** The latest result from the fetcher */
  result?: ReturnTypeP<T>
}

/**
 * The value stored in the SWR state, which is returned by useSwr
 *
 * @param refresh - A callback that will refresh the UI, call the fetcher, and update cache
 */
interface State<T extends P> extends CacheVal<T> {
  /**
   * A boolean that is true if the fetcher is in-flight
   */
  loading: boolean
  /**
   * A callback that will refresh the UI, call the fetcher, and update cache
   *
   * @param props - optional props to pass to the callback. If not provided, the prior props will be re-used
   * @returns a promise of the next value of the fetcher
   */
  refresh: () => ReturnType<T>
}

/**
 * A safe stringify that removes circular references
 * ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
 */
const stringify = (obj: any) => {
  const seen = new WeakSet()
  return JSON.stringify(obj, (_, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  })
}

/**
 * A cache of all the promises that are in-flight. These do not serialize to localStorage so store seperately
 */
const pCache = new Map<string, Promise<P>>()

/**
 * A wrapper around localCache and pCache
 */
const cache = {
  get(key: string): CacheVal<any> | undefined {
    let m = { p: pCache.get(key) }
    const ls = localStorage.getItem('swr:' + key)
    if (ls) m = { ...JSON.parse(ls), ...m }
    return m
  },
  set(key: string, value: CacheVal<any>) {
    const { p, ...rest } = value
    if (p) pCache.set(key, p)
    else {
      pCache.delete(key)
      localStorage.setItem('swr:' + key, stringify(rest))
    }
  },
}

/** FIFO Garbage Collector */
setInterval(() => {
  ;(Object.entries(localStorage) as [string, string][])
    .filter(([k]) => k.startsWith('swr:'))
    .map(([k, v]) => [k, JSON.parse(v)] as [string, CacheVal<any>])
    .sort((a, b) => (a[1]?.t || 0) + (b[1]?.t || 0))
    .slice(100)
    .forEach(([k]) => {
      localStorage.removeItem(k)
    })
}, 60_000)

/**
 *
 * useSwr: an async resolver that displays a cached version (if available) of the
 * callback until the callback resolves.
 *
 * Benefits:
 * - Only 440 bytes (minified + gzipped)
 * - Shows cached data immediately and updates the UI when the callback resolves
 * - Deduplicates concurrent requests: runs the callback only once if duplicates are requested
 * - UX: no flickering, no waiting if cached, enables native scroll restoration
 *
 * @param fetcher - an async callback that returns data. *Data be JSONable*
 * @param props - initial props to pass to the callback (only if callback has arguments)
 *
 * @returns SWR State
 *
 * @example
 * ```ts
 *  import useSwr from '@ulibs/swr'
 *  export function Planets() {
 *    const data = useSwr({
 *      fetcher: (_page: string) => sw.Planets.getPage(Number(_page)),
 *      props: [page]
 *    })
 *    if (data.loading) return <p>Loading...</p>
 *    if (data.error) return <Error error={data.error} />
 *    return (<pre>{JSON.stringify(data.result, null, 2)}</pre>)
 *  }
 * ```
 */
function useSwr<T extends P>(p: {
  /** An async callback that returns data. *Data must be JSONable* */
  fetcher: T
  /** initial props to pass to the callback (only if callback has arguments) */
  props: Parameters<T>
  /** Throttle threshold in ms: time that the cache is deemed current, to avoid over re-fetching */
  throttle?: number
}): State<T>
function useSwr<T extends PNoArgs>(p: {
  fetcher: T
  throttle?: number
}): State<T>
function useSwr<T extends P>({
  fetcher,
  props,
  throttle = 3000,
}: {
  fetcher: T
  props?: Parameters<T>
  throttle?: number
}): State<T> {
  const [state, setState] = useState({} as State<T>)
  const cacheKey = stringify(props) + fetcher.toString()
  const refresh = (): ReturnType<T> => {
    const hit = cache.get(cacheKey) as CacheVal<T>
    if (hit?.p) {
      return hit.p
    }
    if (hit?.result && hit?.t && Date.now() - hit.t < throttle) {
      // @ts-expect-error - TS doesn't like this, but it works
      return (async () => hit.result)()
    }

    const onUpdate = (res: CacheVal<T>) => {
      cache.set(cacheKey, res)
      setState({ ...res, refresh, loading: !!res?.p })
    }

    // @ts-expect-error - TS is having a hard time infering fetcher return type for some reason
    hit.p = fetcher(props)
      .then((r) => {
        onUpdate({ result: r, t: Date.now() })
        return r
      })
      .catch((e) => {
        onUpdate({ error: e, t: Date.now() })
        throw e
      })

    onUpdate(hit)

    return hit.p as ReturnType<T>
  }

  refresh()

  return state
}

export default useSwr
