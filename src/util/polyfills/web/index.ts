import '../iso'
import './hooks'
import './icons'
import './styled'

declare global {
  var global: typeof globalThis
  var isNode: boolean
  var isWeb: boolean
  var isTest: boolean
}

globalThis.global = globalThis as any
global.isNode = false
global.isWeb = true
global.isTest = import.meta.env.NODE_ENV === 'test'
