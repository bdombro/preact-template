import * as iw from 'is-what'

export {}

declare global {
  var getType: typeof iw.getType
  var isAnyObject: typeof iw.isAnyObject
  var isArray: typeof iw.isArray
  var isBlob: typeof iw.isBlob
  var isBoolean: typeof iw.isBoolean
  var isDate: typeof iw.isDate
  var isEmptyArray: typeof iw.isEmptyArray
  var isEmptyObject: typeof iw.isEmptyObject
  var isEmptyString: typeof iw.isEmptyString
  var isError: typeof iw.isError
  var isFile: typeof iw.isFile
  var isFullArray: typeof iw.isFullArray
  var isFullObject: typeof iw.isFullObject
  var isFullString: typeof iw.isFullString
  var isFunction: typeof iw.isFunction
  var isMap: typeof iw.isMap
  var isNaNValue: typeof iw.isNaNValue
  var isNegativeNumber: typeof iw.isNegativeNumber
  var isNull: typeof iw.isNull
  var isNullOrUndefined: typeof iw.isNullOrUndefined
  var isNumber: typeof iw.isNumber
  var isObject: typeof iw.isObject
  var isObjectLike: typeof iw.isObjectLike
  var isOneOf: typeof iw.isOneOf
  var isPlainObject: typeof iw.isPlainObject
  var isPositiveNumber: typeof iw.isPositiveNumber
  var isPrimitive: typeof iw.isPrimitive
  var isPromise: typeof iw.isPromise
  var isRegExp: typeof iw.isRegExp
  var isSet: typeof iw.isSet
  var isString: typeof iw.isString
  var isSymbol: typeof iw.isSymbol
  var isType: typeof iw.isType
  var isUndefined: typeof iw.isUndefined
  var isWeakMap: typeof iw.isWeakMap
  var isWeakSet: typeof iw.isWeakSet
}

globalThis.getType = iw.getType
globalThis.isAnyObject = iw.isAnyObject
globalThis.isArray = iw.isArray
globalThis.isBlob = iw.isBlob
globalThis.isBoolean = iw.isBoolean
globalThis.isDate = iw.isDate
globalThis.isEmptyArray = iw.isEmptyArray
globalThis.isEmptyObject = iw.isEmptyObject
globalThis.isEmptyString = iw.isEmptyString
globalThis.isError = iw.isError
globalThis.isFile = iw.isFile
globalThis.isFullArray = iw.isFullArray
globalThis.isFullObject = iw.isFullObject
globalThis.isFullString = iw.isFullString
globalThis.isFunction = iw.isFunction
globalThis.isMap = iw.isMap
globalThis.isNaNValue = iw.isNaNValue
globalThis.isNegativeNumber = iw.isNegativeNumber
globalThis.isNull = iw.isNull
globalThis.isNullOrUndefined = iw.isNullOrUndefined
globalThis.isNumber = iw.isNumber
globalThis.isObject = iw.isObject
globalThis.isObjectLike = iw.isObjectLike
globalThis.isOneOf = iw.isOneOf
globalThis.isPlainObject = iw.isPlainObject
globalThis.isPositiveNumber = iw.isPositiveNumber
globalThis.isPrimitive = iw.isPrimitive
globalThis.isPromise = iw.isPromise
globalThis.isRegExp = iw.isRegExp
globalThis.isSet = iw.isSet
globalThis.isString = iw.isString
globalThis.isSymbol = iw.isSymbol
globalThis.isType = iw.isType
globalThis.isUndefined = iw.isUndefined
globalThis.isWeakMap = iw.isWeakMap
globalThis.isWeakSet = iw.isWeakSet
