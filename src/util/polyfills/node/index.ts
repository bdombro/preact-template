import '../iso'
import './window'

declare global {
  var global: typeof globalThis
  var isNode: boolean
  var isWeb: boolean
}

globalThis.global = globalThis
global.isNode = true
global.isWeb = false
global.isTest = process.env.NODE_ENV === 'test'
