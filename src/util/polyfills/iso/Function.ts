/* eslint-disable prefer-rest-params */
/**
 * Polyfills for Function
 */

// You must export something or TS gets confused.
export {}

declare global {
  interface FunctionConstructor {
    /**
     * Curry's functions
     *
     * Ex.
     * function foo(a: string, b: string, c: number) {console.log(a + b + c)}
     * const hello = curry(foo)('hello', 'world')
     * hello('1') // prints 'helloworld1'
     * hello('2') // prints 'helloworld2'
     */
    curry: typeof curry

    /**
     * Get the name of the current function.
     */
    getName(): string

    /**
     * Wrap a function with retry logic
     * @param fn - the function to wrap
     * @param maxTries - the maximum number of tries
     * @returns - the wrapped function
     */
    withRetry<T extends Fnc>(fn: T, maxTries?: number): (...props: Parameters<T>) => Promise<ReturnTypeP<T>>

    /**
     * A memoization wrapper with ttl expiration for cache hits.
     *
     * What: Returns the last response from a function if called again with same props
     * before ttl interval has passed.
     *
     * Compared to other memoization algs (fast-memoize, nano-memoize), is much simpler,
     * shorter, easier to fork/enhance while less perfect and slower for primitive args.
     */
    withThrottle: {
      // eslint-disable-next-line @typescript-eslint/ban-types
      <F extends Function>(fn: F, ttl: number): F
      cache: Map<string, {returnVal: any; expires: number}>
    }
  }
}

function curry<A extends any[], R>(fn: (...args: A) => R): Curried<A, R> {
  return (...args: any[]): any =>
    args.length >= fn.length ? fn(...(args as any)) : curry((fn as any).bind(undefined, ...args))
}
Function.curry = curry
type Curried<A extends any[], R> = <P extends Partial<A>>(
  ...args: P
) => P extends A ? R : A extends [...SameLength<P>, ...infer S] ? (S extends any[] ? Curried<S, R> : never) : never

type SameLength<T extends any[]> = Extract<{[K in keyof T]: any}, any[]>

Function.getName = () => {
  const stackLine = new Error()!.stack!.split('\n')[2].trim()
  const fncName = stackLine.match(/at Object.([^ ]+)/)?.[1] ?? 'anonymous'
  return fncName
}

Function.withRetry = (fn, maxTries = 4) => {
  const p = Promise.promisify(fn)
  return async (...props) => {
    let lastError: any = new Error()
    for (let tryCount = 0; tryCount < maxTries; tryCount++) {
      try {
        return await p(...props)
      } catch (err) {
        lastError = err
      }
    }
    throw lastError
  }
}

// @ts-expect-error: TS gets confused with the self reference
Function.withThrottle = withThrottle
function withThrottle<Fn extends (...props: any) => any>(fn: Fn, ttl = 1000) {
  const self = withThrottle
  withThrottle.initialize()
  const throttled = (...props: any) => {
    const cacheKey = JSON.stringify({
      signature: `${fn.name}::${fn.toString().slice(0, 10)}`,
      props,
    })
    let {expires = 0, returnValue} = self.cache.get(cacheKey) || {
      expires: 0,
      returnValue: null,
    }
    const now = Date.now()
    if (now > expires) {
      expires = now + ttl
      returnValue = fn(...props)
      self.cache.set(cacheKey, {expires, returnValue})
    }
    return returnValue
  }
  return throttled as Fn
}
withThrottle.cache = new Map<string, {expires: number; returnValue: any}>()
withThrottle.initialized = false

// FIXME: Convert to FIFO cache instead of a TTL cache. For example,
// setInterval(() => {
//   while (cache.size > 300) {
//     cache.delete(cache.keys().next().value)
//   }
// }, 20_000)
withThrottle.initialize = () => {
  const self = withThrottle
  if (self.initialized) return
  const garbageCollector = () => {
    const now = Date.now()
    self.cache.forEach((_, key) => {
      const expires = self.cache.get(key)?.expires || 0
      if (now > expires) self.cache.delete(key)
    })
  }
  setInterval(garbageCollector, 20e3)
  self.initialized = true
}
