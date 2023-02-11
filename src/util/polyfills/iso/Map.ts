/**
 * Extensions for String
 *
 * Note: Extending primitive's can be problematic without care. For more info, see
 * https://stackoverflow.com/questions/8859828/javascript-what-dangers-are-in-extending-array-prototype
 *
 * Tips:
 * 1. for...in will break if you naively extend via Set.propotype.foo = ...
 *    Instead, use Object.defineProperty({value: fnc, enumerable: false})
 * 2. Drop support for older Internet Explorer
 */

// You must export something or TS gets confused.
export {}

declare global {
  interface Map<K, V> {
    setMaxSize(maxSize: number): void
    copy(): Map<K, V>
    toObj(): Record<string, V>
    /**
     * Like set but the value is a callback that accepts the prior
     * value and returns the next value, kinda like react's useState
     * updater
     **/
    update(key: K, valueCb: (previous: V) => V): Map<K, V>
  }
}

Object.defineProperties(Map.prototype, {
  /**
   * Limit the size of the map by evicting the least-recently-used (aka LRU) items
   *
   * Warning: This hurts performance of map.get and map.set vs a normal map
   */
  setMaxSize: {
    value: function (maxSize: number) {
      mapApplyMaxSize(this, maxSize)
    },
    enumerable: false,
  },
  copy: {
    value: function () {
      return Object.copy(this)
    },
    enumerable: false,
  },
  toObj: {
    value: function () {
      return Object.fromEntries(this)
    },
    enumerable: false,
  },
  update: {
    value: function (key: any, valueCb: (previous: any) => any) {
      return this.set(key, valueCb(this.get(key)))
    },
    enumerable: false,
  },
})

/**
 * Limit the size of a map by evicting the least-recently-used (aka LRU)
 * items. Works by monkey-patching the get and set of a map instance
 *
 * Warning: This hurts performance of map.get and map.set vs a normal map
 */
function mapApplyMaxSize(map: any, maxSize: number) {
  map.max = maxSize
  map._set = map.set
  map._get = map.get
  map.set = (key: any, val: any) => {
    // if key exists, delete it so it can be re-added at end of map
    if (map.has(key)) {
      map.delete(key)
    } else {
      if (map.size >= map.max) {
        // evict top of map (aka oldest)
        map.delete(map.keys().next().value)
      }
    }

    // Now add key to end of map
    map._set(key, val)
    return val
  }
  map.get = (key: any) => {
    const item = map._get(key)
    if (item) {
      setTimeout(() => {
        // put key at end of map
        map.delete(key)
        map._set(key, item)
      })
    }
    return item
  }
}
// Test mapApplyMaxSize
// const assert = (b: boolean) => {
//   if (!b) throw new Error('assertion failed')
// }
// const t = new Map()
// t.setMaxSize(2)
// t.set('a', 1)
// t.set('b', 2)
// t.set('a', 1)
// t.set('c', 3) // should evict 'b'
// assert(t.get('b') === undefined)
// t.set('d', 4) // should evict 'a'
// assert(t.get('a') === undefined)
// t.get('c')
// t.set('e', 5) // should evict 'd'
// assert(t.get('d') === undefined)
// console.log('mapApplyMaxSize test passed')
