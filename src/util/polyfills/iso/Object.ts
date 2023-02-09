import {merge, mergeAndCompare, mergeAndConcat} from 'merge-anything'

import {copy} from './util/copy'
import {detailedDiff} from './util/diff'
import {isEqual} from './util/isEqual'

/**
 * Polyfills for object
 */

// You must export something or TS gets confused.
export {}

declare global {
  var isEqualDebug: boolean
  interface ObjectConstructor {
    /**
     * Make a deep copy of an object so that none of the references are the same
     */
    copy: typeof copy

    /**
     * returns an object with the added, deleted and updated differences
     */
    diff: typeof detailedDiff

    /**
     * Converts an object from a nested structure to a flat structure. Is the opposite
     * of Object.nestify
     *
     * Status: Omitted to reduce bundle size. If needed, install and link
     *
     * @reference
     * https://github.com/mesqueeb/flatten-anything
     *
     * @example
     * ```js
     * const target = {
     *    name: 'Ho-oh',
     *    types: { fire: true, flying: true }
     * }
     *
     * Object.flatten(target)
     * // returns {
     * //  'name': 'Ho-oh',
     * //  'types.fire': true,
     * //  'types.flying': true,
     * //}
     * ```
     */
    flatten: any

    /**
     * A deep equal comparison
     *
     * Set globalThis.isEqualDebug = true to print debug info
     */
    isEqual(foo: any, bar: any): boolean

    /**
     * A deep equal comparison
     *
     * Set globalThis.isEqualDebug = true to print debug info
     */
    isNotEqual(foo: any, bar: any): boolean

    /**
     * Deep merge ....objects. Arrays are clobbered
     *
     * If you want to merge arrays, use Object.mergeAndConcat
     */
    merge: typeof merge

    /**
     * Deep merge with custom compare function
     *
     * There might be times you need to tweak the logic when two things are merged. You can provide your own custom function that's triggered every time a value is overwritten.
     *
     * For this case we use mergeAndCompare. Here is an example with a compare function that concatenates strings:
     *
     * @example
     * ```js
     * import { mergeAndCompare } from 'merge-anything'
     *
     * function concatStrings(originVal, newVal, key) {
     *   if (typeof originVal === 'string' && typeof newVal === 'string') {
     *     // concat logic
     *     return `${originVal}${newVal}`
     *   }
     *   // always return newVal as fallback!!
     *   return newVal
     * }
     *
     * mergeAndCompare(concatStrings, { name: 'John' }, { name: 'Simth' })
     * // returns { name: 'JohnSmith' }
     * ```
     *
     * Note for TypeScript users. The type returned by this function might not be correct. In that case you have to cast the result to your own provided interface
     */
    mergeCustom: typeof mergeAndCompare

    /**
     * Deep merge ...objects. Arrays are merged too.
     *
     * If you want to clobber arrays, use `Object.merge`
     */
    mergeAndConcat: typeof mergeAndConcat

    /**
     * Converts an object from a flat structure to a nested structure. Is the opposite
     * of Object.flattenify
     *
     * Status: Omitted to reduce bundle size. If needed, install and link
     *
     * @reference
     * https://github.com/mesqueeb/nestify-anything
     *
     * @example
     * ```js
     * const target = {
     *   'name': 'Ho-oh',
     *   'types.fire': true,
     *   'types.flying': true,
     * }
     *
     * Object.nestify(target)
     * // returns {
     * //   name: 'Ho-oh',
     * //   types: { fire: true, flying: true }
     * // }
     * ```
     */
    nestify: any

    /** Return obj excluding attributes by keys  */
    omit<T extends Record<string, any>, K extends keyof T>(
      obj: T,
      keys: readonly K[] | K[]
    ): Omit<T, K>

    /**
     * Return obj excluding attributes based on a filter function
     *
     * @param obj - the object to filter
     * @param filter - the filter function. Takes the attribute name and value as arguments to return true to keep the attribute
     * @param inPlace - if true, the object will be modified in place. Otherwise, a new object will be returned
     */
    omitCustom<T extends Record<string, any>>(
      obj: T,
      filter: (attrName: string, attrVal: any) => any
    ): T

    /** Return obj excluding attrs with falsey values */
    omitFalseyAttrs<T extends Record<string, any>>(obj: T, inPlace?: boolean): Partial<T>

    /** Return obj excluding attrs with null values */
    omitNullAttrs<T extends Record<string, any>>(obj: T, inPlace?: boolean): Partial<T>

    /** Return obj excluding attrs with undefined values */
    omitUndefAttrs<T extends Record<string, any>>(obj: T, inPlace?: boolean): Partial<T>

    /** Return obj only including attributes by keys */
    pick<T extends Record<string, any>, K extends keyof T>(
      obj: T,
      keys: readonly K[] | K[]
    ): Pick<T, K>

    /**
     * Converts an object into a semi-unique hash
     *
     * Compared to other hash algs (MD5), is much simpler, shorter, faster while less perfect
     * Src: https://stackoverflow.com/a/8831937/1202757
     */
    toHash(obj: any): string
  }

  // Sadly, Object is not generic, so we cannot extend it and acces this in a typesafe way :-(.
  // interface Object<T> {}
  interface Object {
    /** Alias for Object.excludes(this, attr). WARNING: not typesafe */
    __excludes(attr: string): boolean
    /** Alias for Object.entries(this) */
    __entries<T extends Object>(): [keyof T, any][]
    /** Alias for Object.includes(this, attr). WARNING: not typesafe */
    __includes(attr: string): boolean
    /** Alias for Object.isEqualTo(this, that). WARNING: not typesafe */
    __isEqualTo(otherObj: any): boolean
    /** Alias for Object.isNotEqualTo(this, that). WARNING: not typesafe */
    __isNotEqualTo(otherObj: any): boolean
    /** Alias for Object.keyMap(this, fnc). */
    __keyMap<T extends Object>(fnc: (key: keyof T) => T): T[]
    /** Alias for Object.keyReduce(this, fnc, init). */
    __keyReduce<T extends Object, A extends Object>(fnc: (acc: A, key: keyof T) => A, init: A): A
    /** Alias for Object.keys(this). */
    __keys<T extends Object>(): (keyof T)[]
    /**
     * Converts an object into a semi-unique hash
     *
     * Compared to other hash algs (MD5), is much simpler, shorter, faster while less perfect
     * Src: https://stackoverflow.com/a/8831937/1202757
     *
     * Known weaknesses:
     * 	- If hashing a function, two different functions could have the same hash
     */
    __toHash(): string
    /** Alias for Object.toMap(this, that). WARNING: not typesafe */
    __toMap(): Map<string, any>
    /** Alias for Object.values(this). WARNING: not typesafe */
    __values(): any[]
  }
}

Object.copy = copy

Object.diff = detailedDiff

Object.flatten = () => {
  throw new Error('Omitted to save bundle size')
}

Object.isEqual = function (a, b) {
  const res = isEqual(a, b)
  if (!res && globalThis.isEqualDebug) console.log(Object.diff(a, b))
  return res
}

Object.isNotEqual = function (a, b) {
  return !Object.isEqual(a, b)
}
Object.merge = merge
Object.mergeCustom = mergeAndCompare
Object.mergeAndConcat = mergeAndConcat

Object.nestify = () => {
  throw new Error('Omitted to save bundle size')
}

Object.omit = function (obj, keys) {
  const res = Object.assign({}, obj)
  keys?.forEach(k => {
    if (k in obj) delete res[k]
  })
  return res
}

Object.omitCustom = function (obj, filter) {
  const obj2 = Object.copy(obj)
  for (const key in obj2) {
    if (!filter(key, obj2[key])) delete obj2[key]
  }
  return obj2
}

Object.omitFalseyAttrs = function (obj) {
  return Object.omitCustom(obj, (_, val) => val)
}

Object.omitNullAttrs = function (obj) {
  return Object.omitCustom(obj, (_, val) => val !== null)
}

Object.omitUndefAttrs = function (obj) {
  return Object.omitCustom(obj, (_, val) => val !== undefined)
}

Object.pick = function (obj, keys) {
  const res: any = {}
  keys?.forEach(k => {
    if (k in obj) res[k] = obj[k]
  })
  return res
}

Object.toHash = obj => {
  const hash = Math.abs(
    Array.from(typeof obj === 'string' ? obj : JSON.stringify(obj)).reduce(
      (hash, char) => 0 | (31 * hash + char.charCodeAt(0)),
      0
    )
  )
  return hash.toString(32)
}

Object.defineProperties(Object.prototype, {
  __toHash: {
    value: function () {
      return Object.toHash(this)
    },
    enumerable: false,
  },
  __keys: {
    value: function () {
      return Object.keys(this)
    },
    enumerable: false,
  },
  __values: {
    value: function () {
      return Object.values(this)
    },
    enumerable: false,
  },
  __entries: {
    value: function () {
      return Object.entries(this)
    },
    enumerable: false,
  },
  __isEqualTo: {
    value: function (that: any) {
      return Object.isEqual(this, that)
    },
    enumerable: false,
  },
  __isNotEqualTo: {
    value: function (that: any) {
      return Object.isNotEqual(this, that)
    },
    enumerable: false,
  },
  __includes: {
    value: function (prop: string) {
      return this.hasOwnProperty(prop)
    },
    enumerable: false,
  },
  __excludes: {
    value: function (prop: string) {
      return !this.hasOwnProperty(prop)
    },
    enumerable: false,
  },
  ___toMap: {
    value: function () {
      return new Map(Object.entries(this))
    },
    enumerable: false,
  },
  __keyMap: {
    value: function (fn: (...props: any) => any) {
      return this._keys().map(fn)
    },
    enumerable: false,
  },
  __keyReduce: {
    value: function (fn: (...props: any) => any, init: any) {
      return this._keys().reduce(fn, init)
    },
    enumerable: false,
  },
})
