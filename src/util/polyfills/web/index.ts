import './primitives'

import '../iso'
import './hooks'
import './icons'

globalThis.global = globalThis as any
;(globalThis as TSFIXME).isNode = false
;(globalThis as TSFIXME).isWeb = true
;(globalThis as TSFIXME).env = import.meta.env
;(globalThis as TSFIXME).isProd = import.meta.env.PROD
