/**
 * Lazily-loaded icons from Material Design Icons, and helpers to
 * add more features and easily manage them.
 *
 * For enhanced props, see IconSvgProps
 */
import {addCss} from '@ustyle/styled'

// You must export something or TS gets confused.
export {}

declare global {
  var Icon: IconType
  type IconKeys = keyof typeof icons
  type IconProps = Omit<LazyIconSvgProps, 'name' | 'svgPathImport'> & {
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
  // account: () => import('mdi-paths-split/CardAccountDetailsOutline'),
  alert: () => import('mdi-paths-split/AlertOutline'),
  // arrowL: () => import('mdi-paths-split/ArrowLeft'),
  // arrowR: () => import('mdi-paths-split/ArrowRight'),
  // auth: () => import('mdi-paths-split/ShieldAccountOutline'),
  // building: () => import('mdi-paths-split/OfficeBuildingMarkerOutline'),
  // carrotUp: () => import('mdi-paths-split/MenuUp'),
  // carrotDown: () => import('mdi-paths-split/MenuDown'),
  // carrotLeft: () => import('mdi-paths-split/MenuLeft'),
  // carrotRight: () => import('mdi-paths-split/MenuRight'),
  // checkboxM: () => import('mdi-paths-split/CheckboxMarked'),
  // checkboxB: () => import('mdi-paths-split/CheckboxBlankOutline'),
  // chevronL2x: () => import('mdi-paths-split/ChevronDoubleLeft'),
  // chevronR2x: () => import('mdi-paths-split/ChevronDoubleRight'),
  close: () => import('mdi-paths-split/Close'),
  // counter: () => import('mdi-paths-split/Counter'),
  // dotsV: () => import('mdi-paths-split/DotsVertical'),
  error: () => import('mdi-paths-split/AlertOctagonOutline'),
  // home: () => import('mdi-paths-split/HomeOutline'),
  info: () => import('mdi-paths-split/InformationOutline'),
  // login: () => import('mdi-paths-split/LoginVariant'),
  // logout: () => import('mdi-paths-split/LogoutVariant'),
  // mapPin: () => import('mdi-paths-split/MapMarker'),
  // menu: () => import('mdi-paths-split/MenuOpen'),
  // person: () => import('mdi-paths-split/Account'),
  // palette: () => import('mdi-paths-split/PaletteOutline'),
  // post: () => import('mdi-paths-split/PostOutline'),
  // reactLogo: () => import('mdi-paths-split/React'),
  // roundedCornerInv: () => import('~/util/iconsCustom/RoundedCornerInverted'),
  // search: () => import('mdi-paths-split/Magnify'),
  // support: () => import('mdi-paths-split/Lifebuoy'),
  success: () => import('mdi-paths-split/CheckCircleOutline'),
  // tasks: () => import('mdi-paths-split/OrderBoolAscendingVariant'),
} as const

/**
 * A component that lazily loads an icon from Material Design Icons
 * by name. The names available are declared in the `icons` object above.
 */
function Icon({name, ...props}: IconProps) {
  return <LazyIconSvg svgPathImport={icons[name]} {...props} />
}

// Helpers

interface LazyIconSvgProps extends Omit<IconSvgProps, 'd' | 'path'> {
  /**
   * A cb that returns a promise of an object with a `default` property = string
   * of an SVG's path `d` attribute. The 'd' attribute is the actual content of
   * an MDI svg.
   *
   * @example
   * ```js
   * () => import('@iconify/icons-mdi/home')
   * ```
   */
  svgPathImport: () => Promise<any> // Like () => import('@iconify/icons-mdi/home')
}

/**
 * A component that lazily loads an icon using a cb that returns a promise.
 * The promise should resolve to an object with a `default` property = string
 * of an SVG's path `d` attribute. The 'd' attribute is the actual content of
 * an MDI svg.
 *
 * @param svgPathImport A cb that returns a promise of an object with a `default` property = string of an SVG's path `d` attribute
 * @param IconSvg props excluding `d` and `path`
 */
function LazyIconSvg({svgPathImport, ...props}: LazyIconSvgProps) {
  const isMounted = useMountedState()
  const [svgPath, setSvgPath] = useState('')
  useEffect(() => {
    svgPathImport().then(module => {
      if (isMounted()) setSvgPath(module.default)
    })
  }, [])
  return <IconSvg d={svgPath} {...props} />
}

// Enhanced svg element
interface IconSvgProps extends Omit<JSX.IntrinsicElements['svg'], 'size'> {
  size?: number | string // Set width and height in one prop
  horizontal?: boolean // flip horizontally
  vertical?: boolean // flip vertically
  rotate?: number // rotate degrees
  path?: string // the path part of the svg
  spin?: boolean | number // spin the svg # seconds per spin. Default = 2
  spinInverse?: boolean // inverse the spin
}

/**
 *
 */
function IconSvg({
  d = '',
  path = '',
  size = 24,
  fill = 'currentColor',
  horizontal,
  vertical,
  rotate = 0,
  spin,
  spinInverse,
  style = {},
  ...props
}: IconSvgProps) {
  if (typeof style !== 'string') {
    style.verticalAlign = style.verticalAlign || 'middle'
    const transforms: string[] = style.transform ? [style.transform as string] : []
    if (horizontal) transforms.push('scaleX(-1)')
    if (vertical) transforms.push('scaleY(-1)')
    if (rotate !== 0) transforms.push(`rotate(${rotate}deg)`)
    if (transforms.length > 0) {
      style.transform = transforms.join(' ')
      style.transformOrigin = 'center'
    }
    if (spin) {
      const spinSec = spin === true || typeof spin !== 'number' ? 2 : spin
      style.animation = `spin${spinInverse ? '-inverse' : ''} linear ${Math.abs(spinSec)}s infinite`
      style.transformOrigin = 'center'
    }
  }

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} {...props} style={style}>
      {path}
      {d && <path d={d} />}
    </svg>
  )
}
