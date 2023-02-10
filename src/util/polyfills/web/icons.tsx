import {LazyIconSvg, LazyIconSvgProps} from '@slimr/mdi-paths/icon-components'
import {addCss} from '@slimr/styled'

// You must export something or TS gets confused.
export {}

declare global {
  var Icon: IconType
  type IconKeys = keyof typeof icons
  type IconProps = Omit<LazyIconSvgProps, 'name' | 'pathImporter'> & {
    name: IconKeys
  }
  type IconType = (props: IconProps) => JSX.Element
}

globalThis.Icon = Icon

// Add css spin effects
addCss(`
@keyframes spin-inverse { to { transform: rotate(-360deg) } }
@keyframes spin { to { transform: rotate(360deg) } }
`)

const icons = {
  // account: () => import('@slimr/mdi-paths/CardAccountDetailsOutline'),
  alert: () => import('@slimr/mdi-paths/AlertOutline'),
  // arrowL: () => import('@slimr/mdi-paths/ArrowLeft'),
  // arrowR: () => import('@slimr/mdi-paths/ArrowRight'),
  // auth: () => import('@slimr/mdi-paths/ShieldAccountOutline'),
  // building: () => import('@slimr/mdi-paths/OfficeBuildingMarkerOutline'),
  // carrotUp: () => import('@slimr/mdi-paths/MenuUp'),
  // carrotDown: () => import('@slimr/mdi-paths/MenuDown'),
  // carrotLeft: () => import('@slimr/mdi-paths/MenuLeft'),
  // carrotRight: () => import('@slimr/mdi-paths/MenuRight'),
  // checkboxM: () => import('@slimr/mdi-paths/CheckboxMarked'),
  // checkboxB: () => import('@slimr/mdi-paths/CheckboxBlankOutline'),
  // chevronL2x: () => import('@slimr/mdi-paths/ChevronDoubleLeft'),
  // chevronR2x: () => import('@slimr/mdi-paths/ChevronDoubleRight'),
  close: () => import('@slimr/mdi-paths/Close'),
  // counter: () => import('@slimr/mdi-paths/Counter'),
  // dotsV: () => import('@slimr/mdi-paths/DotsVertical'),
  error: () => import('@slimr/mdi-paths/AlertOctagonOutline'),
  // home: () => import('@slimr/mdi-paths/HomeOutline'),
  info: () => import('@slimr/mdi-paths/InformationOutline'),
  // login: () => import('@slimr/mdi-paths/LoginVariant'),
  // logout: () => import('@slimr/mdi-paths/LogoutVariant'),
  // mapPin: () => import('@slimr/mdi-paths/MapMarker'),
  // menu: () => import('@slimr/mdi-paths/MenuOpen'),
  // person: () => import('@slimr/mdi-paths/Account'),
  // palette: () => import('@slimr/mdi-paths/PaletteOutline'),
  // post: () => import('@slimr/mdi-paths/PostOutline'),
  // reactLogo: () => import('@slimr/mdi-paths/React'),
  // roundedCornerInv: () => import('~/util/iconsCustom/RoundedCornerInverted'),
  // search: () => import('@slimr/mdi-paths/Magnify'),
  // support: () => import('@slimr/mdi-paths/Lifebuoy'),
  success: () => import('@slimr/mdi-paths/CheckCircleOutline'),
  // tasks: () => import('@slimr/mdi-paths/OrderBoolAscendingVariant'),
} as const

/**
 * A component that lazily loads an icon from Material Design Icons
 * by name. The names available are declared in the `icons` object above.
 */
function Icon({name, ...props}: IconProps) {
  return <LazyIconSvg pathImporter={icons[name]} {...props} />
}
