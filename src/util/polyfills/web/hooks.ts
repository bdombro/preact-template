import type {Inputs, StateUpdater} from 'preact/hooks'
import {
  useCallback as _useCallback,
  useContext as _useContext,
  useDebugValue as _useDebugValue,
  useDeferredValue as _useDeferredValue,
  useEffect as _useEffect,
  useId as _useId,
  useImperativeHandle as _useImperativeHandle,
  useInsertionEffect as _useInsertionEffect,
  useLayoutEffect as _useLayoutEffect,
  useMemo as _useMemo,
  useReducer as _useReducer,
  useRef as _useRef,
  useState as _useState,
  useSyncExternalStore as _useSyncExternalStore,
  useTransition as _useTransition,
} from 'react'

// You must export something or TS gets confused.
export {}

// Global declarations at bottom bc some can't be hoisted 👇

/**
 * useClickAway: Triggers a callback when user clicks outside the target element.
 * Ex. useClickAway(ref, callback);
 */
function _useClickAway<E extends Event = Event>(
  ref: React.MutableRefObject<HTMLElement | null>,
  onDismiss: (event: E) => void,
  events: string[] = _useClickAway.defaultEvents
) {
  const savedCallback = useRef(onDismiss)
  useEffect(() => {
    savedCallback.current = onDismiss
  }, [onDismiss])
  useEffect(() => {
    const handler = (event: any) => {
      const {current: el} = ref
      el && !el.contains(event.target) && savedCallback.current(event)
    }
    for (const eventName of events) {
      document.addEventListener(eventName, handler)
    }
    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler)
      }
    }
  }, [events, ref])
}
_useClickAway.defaultEvents = ['mousedown', 'touchstart']

/**
 * useEvent: subscribes a handler to window events.
 * Ex. useEvent('keydown', callback); (also see useKey)
 */
const _useEvent: UseEvent = (type, listener, options) => {
  useEffect(() => {
    addEventListener(type as any, listener, options)
    return () => {
      removeEventListener(type as any, listener, options)
    }
  }, [type, listener, JSON.stringify(options)])
}
type UseEvent = <K extends string | keyof WindowEventMap>(
  type: UseEventsProps<K>['type'],
  listener: UseEventsProps<K>['listener'],
  options?: UseEventsProps<K>['options']
) => void
type UseEventsProps<K extends string | keyof WindowEventMap> = {
  type: K
  listener: (this: Window, ev: K extends keyof WindowEventMap ? WindowEventMap[K] : any) => any
  options?: boolean | AddEventListenerOptions
}

/**
 * executes a handler when a keyboard key is used.
 * Ex. useKey('ArrowUp', callback);
 */
function _useKey(
  key: KeyFilter,
  fn: Handler = () => {},
  opts: UseKeyOptions = {},
  deps: Inputs = [key]
) {
  const {event = 'keydown', ...optsNoEvent} = opts
  const useMemoHandler = useMemo(() => {
    const predicate: KeyPredicate = _useKey.createKeyPredicate(key)
    const handler: Handler = handlerEvent => {
      if (predicate(handlerEvent)) return fn(handlerEvent)
    }
    return handler
  }, deps)
  useEvent(event, useMemoHandler, optsNoEvent)
}
_useKey.codes = {
  Esc: 27,
}
_useKey.createKeyPredicate = (keyFilter: KeyFilter): KeyPredicate =>
  typeof keyFilter === 'function'
    ? keyFilter
    : typeof keyFilter === 'string'
    ? (event: KeyboardEvent) => event.key === keyFilter
    : keyFilter
    ? () => true
    : () => false
type KeyPredicate = (event: KeyboardEvent) => boolean
type KeyFilter = null | undefined | string | number | ((event: KeyboardEvent) => boolean)
type Handler = (event: KeyboardEvent) => void
interface UseKeyOptions extends AddEventListenerOptions {
  event?: 'keydown' | 'keypress' | 'keyup'
}

/**
 * useEffectDeep: Like useEffect, but does a deep compare instead default compare
 * to avoid misfires
 */
function _useEffectDeep(callback: Fnc, varsToWatch: any[]) {
  const lastSeenProps = useRef<Inputs[]>([])
  useEffect(watchProps, varsToWatch)

  function watchProps() {
    if (Object.isNotEqual(varsToWatch, lastSeenProps.current)) {
      lastSeenProps.current = varsToWatch
      return callback()
    }
  }
}

/**
 * useFirstMountState: check if current render is first.
 * from react-use
 */
function _useFirstMountState(): boolean {
  const isFirst = useRef(true)
  if (isFirst.current) {
    isFirst.current = false
    return true
  }
  return isFirst.current
}

/**
 * useIntersection: track the visible state of an element by ref
 * Caution: the component will re-render on state change.
 */
function _useIntersection(
  ref: React.MutableRefObject<HTMLElement | null>,
  options: IntersectionObserverInit
) {
  const [state, setState] = useState<IntersectionObserverEntry | null>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setState(entry), options)
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])
  return state
}

/**
 * useInterval: Call callback cb every ms milliseconds after mount
 * @param cb - callback to call after timeout
 * @param ms - milliseconds to wait before calling cb after mount
 * @param cancelOnDismount - whether to cancel on dismount
 */
function _useInterval(cb: () => any, ms = 0, cancelOnDismount = true) {
  useEffect(() => {
    const interval = setInterval(cb, ms)
    return () => {
      if (cancelOnDismount) clearInterval(interval)
    }
  }, [])
}

/**
 * useLayoutEffectDeep: Like useLayoutEffect, but does a deep compare instead default compare
 * to avoid misfires
 */
function _useLayoutEffectDeep(callback: Fnc, varsToWatch: any[]) {
  const lastSeenProps = useRef<Inputs[]>([])
  useLayoutEffect(watchProps, varsToWatch)

  function watchProps() {
    if (Object.isNotEqual(varsToWatch, lastSeenProps.current)) {
      lastSeenProps.current = varsToWatch
      return callback()
    }
  }
}

/**
 * useMount: Call callback cb after mount. Does nothing with return result
 */
function _useMountEffect(fn: () => any) {
  useEffect(() => {
    fn()
  }, [])
}

/**
 * useMountedState: returns a fcn that returns true if component is mounted.
 * from react-use
 */
function _useMountedState() {
  const isMountedRef = useRef(true)
  const isMounted = useCallback(() => isMountedRef.current, [])
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return isMounted
}

/**
 * A hook that watches a css media breakpoint
 *
 * e.g. isWide = useMedia('(min-width: 768px)')
 */
function _useMedia(query: string) {
  const [state, setState] = useState(matchMedia(query).matches)
  useEffect(() => {
    let mounted = true
    const mql = matchMedia(query)
    const onChange = () => mounted && setState(!!mql.matches)
    mql.addEventListener('change', onChange)
    setState(mql.matches)
    return () => {
      mounted = false
      mql.removeEventListener('change', onChange)
    }
  }, [query])
  return state
}

/**
 * useEffectDeep: Like useEffect, but does a deep compare instead default compare
 * to avoid misfires
 */
function _useMemoDeep(callback: Fnc, varsToWatch: any[]) {
  const [lastSeenProps, setLastSeenProps] = useState(varsToWatch)
  useEffect(watchProps, varsToWatch)
  return useMemo(callback, [lastSeenProps])

  function watchProps() {
    if (Object.isNotEqual(varsToWatch, lastSeenProps)) setLastSeenProps(varsToWatch)
  }
}

/**
 * useUpdate: returns a callback, which re-renders component when called
 * @param ms - if supplied, will automatically re-render after ms milliseconds
 */
function _useRerenderCb(ms = 0) {
  const updateReducer = (num: number): number => (num + 1) % 1_000_000
  const [, rerenderCb] = useReducer(updateReducer, 0)
  useTimeout(() => {
    if (ms) (rerenderCb as () => void)()
  }, ms)
  return rerenderCb as () => void
}

/**
 * Use a stateful Set as if it were almost a normal Set, with helpers like toggle and reset.
 */
export interface UseSet<T> {
  current: Set<T>
  size: number
  has(v: T): boolean
  add(v: T): void
  delete(v: T): void
  toggle(v: T): void
  clear(): void
  reset(): void
  set: StateUpdater<Set<T>>
}
function _useSet<T>(initial: Set<T> = new Set()) {
  const [set, setSet] = useState(initial)
  const has: UseSet<T>['has'] = v => set.has(v)
  const add: UseSet<T>['add'] = useCallback(
    v =>
      setSet(curr => {
        curr.add(v)
        return new Set([...curr])
      }),
    []
  )
  const del: UseSet<T>['delete'] = useCallback(
    v =>
      setSet(curr => {
        curr.delete(v)
        return new Set([...curr])
      }),
    []
  )
  const toggle: UseSet<T>['toggle'] = useCallback(
    v =>
      setSet(curr => {
        if (curr.has(v)) curr.delete(v)
        else curr.add(v)
        return new Set([...curr])
      }),
    []
  )
  const clear: UseSet<T>['clear'] = useCallback(() => setSet(new Set<T>()), [])
  const reset: UseSet<T>['reset'] = useCallback(() => setSet(new Set([...initial])), [])
  const res: UseSet<T> = {
    current: set,
    size: set.size,
    has,
    add,
    delete: del,
    toggle,
    clear,
    reset,
    set: setSet,
  }
  return res
}

/**
 * useTimeout: Call callback cb after ms milliseconds after mount
 * @param cb - callback to call after timeout
 * @param ms - milliseconds to wait before calling cb after mount
 * @param cancelOnDismount - whether to cancel on dismount
 */
function _useTimeout(cb: () => any, ms = 0, cancelOnDismount = true) {
  useEffect(() => {
    const timeout = setTimeout(cb, ms)
    return () => {
      if (cancelOnDismount) clearTimeout(timeout)
    }
  }, [])
}

/**
 * useMount: Call callback cb on unmount
 */
function _useUnmountEffect(fn: () => any) {
  useEffect(() => fn, [])
}

/**
 * useUpdateEffect: run an effect only on updates.
 * based on react-use
 */
const _useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState()
  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
  }, deps)
}

declare global {
  // React hooks
  var useCallback: typeof _useCallback
  var useDebugValue: typeof _useDebugValue
  var useDeferredValue: typeof _useDeferredValue
  var useEffect: typeof _useEffect
  var useId: typeof _useId
  var useImperativeHandle: typeof _useImperativeHandle
  var useInsertionEffect: typeof _useInsertionEffect
  var useContext: typeof _useContext
  var useLayoutEffect: typeof _useLayoutEffect
  var useMemo: typeof _useMemo
  var useReducer: typeof _useReducer
  var useRef: typeof _useRef
  var useState: typeof _useState
  var useSyncExternalStore: typeof _useSyncExternalStore
  var useTransition: typeof _useTransition

  // Custom hooks
  var useClickAway: typeof _useClickAway
  var useKey: typeof _useKey
  var useEffectDeep: typeof _useEffectDeep
  var useEvent: typeof _useEvent
  var useFirstMountState: typeof _useFirstMountState
  var useIntersection: typeof _useIntersection
  var useInterval: typeof _useInterval
  var useLayoutEffectDeep: typeof _useLayoutEffectDeep
  var useMountEffect: typeof _useMountEffect
  var useMountedState: typeof _useMountedState
  var useMedia: typeof _useMedia
  var useMemoDeep: typeof _useMemoDeep
  var useRerenderCb: typeof _useRerenderCb
  var useSet: typeof _useSet
  var useTimeout: typeof _useTimeout
  var useUnmountEffect: typeof _useUnmountEffect
  var useUpdateEffect: typeof _useUpdateEffect
}

// React hooks
globalThis.useCallback = _useCallback
globalThis.useDebugValue = _useDebugValue
globalThis.useDeferredValue = _useDeferredValue
globalThis.useEffect = _useEffect
globalThis.useId = _useId
globalThis.useImperativeHandle = _useImperativeHandle
globalThis.useInsertionEffect = _useInsertionEffect
globalThis.useContext = _useContext
globalThis.useLayoutEffect = _useLayoutEffect
globalThis.useMemo = _useMemo
globalThis.useReducer = _useReducer
globalThis.useRef = _useRef
globalThis.useState = _useState
globalThis.useSyncExternalStore = _useSyncExternalStore
globalThis.useTransition = _useTransition

// Custom hooks
globalThis.useClickAway = _useClickAway
globalThis.useKey = _useKey
globalThis.useEffectDeep = _useEffectDeep
globalThis.useEvent = _useEvent
globalThis.useFirstMountState = _useFirstMountState
globalThis.useIntersection = _useIntersection
globalThis.useInterval = _useInterval
globalThis.useLayoutEffectDeep = _useLayoutEffectDeep
globalThis.useMountEffect = _useMountEffect
globalThis.useMountedState = _useMountedState
globalThis.useMedia = _useMedia
globalThis.useMemoDeep = _useMemoDeep
globalThis.useRerenderCb = _useRerenderCb
globalThis.useSet = _useSet
globalThis.useTimeout = _useTimeout
globalThis.useUnmountEffect = _useUnmountEffect
globalThis.useUpdateEffect = _useUpdateEffect
