/* eslint-disable no-var */
import {detailedDiff} from './util/diff'
import isEqual from './util/fast-deep-equal'

/**
 * Polyfills for object
 */

// You must export something or TS gets confused.
export {}

declare global {
  interface ObjectConstructor {
    pick<T extends Record<string, any>, K extends keyof T>(
      obj: T,
      keys: readonly K[] | K[]
    ): Pick<T, K>
    omit<T extends Record<string, any>, K extends keyof T>(
      obj: T,
      keys: readonly K[] | K[]
    ): Omit<T, K>
    filterAttrs<T extends Record<string, any>>(
      obj: T,
      filter: (attrName: string, attrVal: any) => any,
      inPlace?: boolean
    ): T
    rmFalseyAttrs<T extends Record<string, any>>(obj: T, inPlace?: boolean): Partial<T>
    rmNullAttrs<T extends Record<string, any>>(obj: T, inPlace?: boolean): Partial<T>
    rmUndefAttrs<T extends Record<string, any>>(obj: T, inPlace?: boolean): Partial<T>

    /**
     * Converts an object into a semi-unique hash
     *
     * Compared to other hash algs (MD5), is much simpler, shorter, faster while less perfect
     * Src: https://stackoverflow.com/a/8831937/1202757
     */
    toHash(obj: any): string

    diff: typeof detailedDiff
    isEqual(foo: any, bar: any): boolean
    isNotEqual(foo: any, bar: any): boolean
    // Note: Clone is imperfect!
    // copy<T extends any>(obj: T): T
    copy: typeof structuredClone
  }

  // Sadly, Object is not generic, so we cannot extend it and acces this in a typesafe way :-(.
  // interface Object<T> {}
  interface Object {
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
    /**
     * Alias for keys(obj) but MORE TYPESAFE!
     */
    __keys<T extends Object>(): (keyof T)[]
    /**
     * Alias for, but not typesafe values(obj)
     */
    __values(): any[]
    /**
     * Alias for, but not typesafe entries(obj)
     */
    __entries<T extends Object>(): [keyof T, any][]
    /**
     * Alias for Object.isEqual
     */
    __isEqualTo(otherObj: any): boolean
    /**
     * Alias for Object.isEqual
     */
    __isNotEqualTo(otherObj: any): boolean
    /**
     * Alias for Object.hasOwnProperty(prop)
     */
    __includes(prop: string): boolean
    /**
     * Alias for !Object.hasOwnProperty(prop)
     */
    __excludes(prop: string): boolean
    /**
     * Alias for, but not typesafe `new Map(entries(obj))`
     */
    __toMap(): Map<string, any>
    /**
     * Alias for obj._keys().map(key => ...)
     */
    __keyMap<T extends Object>(fn: (key: keyof T) => T): T[]
    /**
     * Alias for obj._keys().reduce((acc, key) => ..., init)
     */
    __keyReduce<T extends Object, A extends Object>(fn: (acc: A, key: keyof T) => A, init: A): A
  }
}

Object.pick = function (obj, keys) {
  const res: any = {}
  keys?.forEach(k => {
    if (k in obj) res[k] = obj[k]
  })
  return res
}

Object.omit = function (obj, keys) {
  const res = Object.assign({}, obj)
  keys?.forEach(k => {
    if (k in obj) delete res[k]
  })
  return res
}

Object.filterAttrs = function (obj, filter, inPlace) {
  const obj2 = inPlace ? obj : Object.copy(obj)
  for (const key in obj2) {
    if (!filter(key, obj2[key])) delete obj2[key]
  }
  return obj2
}

Object.rmFalseyAttrs = function (obj, inPlace) {
  return Object.filterAttrs(obj, (_, val) => val, inPlace)
}

Object.rmNullAttrs = function (obj, inPlace) {
  return Object.filterAttrs(obj, (_, val) => val !== null, inPlace)
}

Object.rmUndefAttrs = function (obj, inPlace) {
  return Object.filterAttrs(obj, (_, val) => val !== undefined, inPlace)
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

Object.diff = detailedDiff

/**
 * Copied from npm/fast-deep-equal and made easier to step through
 */
Object.isEqual = function (a, b) {
  const res = isEqual(a, b)
  if (!res && (globalThis as any).isEqualDebug) console.log(Object.diff(a, b))
  return res
}

Object.isNotEqual = function (a, b) {
  return !Object.isEqual(a, b)
}

// Is imperfect on Classes or objects containing classes
// Inspired by https://stackoverflow.com/a/46692810/1202757
Object.copy = structuredClone
// Object.copy = (obj: any) => {
//   if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj) return obj

//   switch (obj.constructor) {
//     case Date:
//       return new Date(obj)
//     case Array:
//       return obj.map(Object.copy)
//     case Set:
//       return new Set([...obj].map(Object.copy))
//     case Map:
//       return new Map([...obj.entries()].map(Object.copy))
//     default: // means we have no idea what it is :-/
//       // This is the imperfect part: we can't perfectly copy classes, but we can come close
//       const temp = Object.assign({}, obj)
//       for (const key in obj) {
//         if (Object.prototype.hasOwnProperty.call(obj, key)) {
//           obj['isActiveClone'] = null // prevent cyclical reference
//           temp[key] = Object.copy(obj[key])
//           delete obj['isActiveClone']
//         }
//       }
//       return temp
//   }
// }

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
