/**
 * Lazily-loaded icons from Material Design Icons, and helpers to
 * add more features and easily manage them.
 *
 * Feel free to import *, bc the actual icons aren't loaded until mounted.
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
  account: () => import('@iconify/icons-mdi/card-account-details-outline'),
  alert: () => import('@iconify/icons-mdi/alert-outline'),
  arrowL: () => import('@iconify/icons-mdi/arrow-left'),
  arrowR: () => import('@iconify/icons-mdi/arrow-right'),
  auth: () => import('@iconify/icons-mdi/shield-account-outline'),
  building: () => import('@iconify/icons-mdi/office-building-marker-outline'),
  carrotUp: () => import('@iconify/icons-mdi/menu-up'),
  carrotDown: () => import('@iconify/icons-mdi/menu-down'),
  carrotLeft: () => import('@iconify/icons-mdi/menu-left'),
  carrotRight: () => import('@iconify/icons-mdi/menu-right'),
  checkboxM: () => import('@iconify/icons-mdi/checkbox-marked'),
  checkboxB: () => import('@iconify/icons-mdi/checkbox-blank-outline'),
  chevronL2x: () => import('@iconify/icons-mdi/chevron-double-left'),
  chevronR2x: () => import('@iconify/icons-mdi/chevron-double-right'),
  close: () => import('@iconify/icons-mdi/close'),
  counter: () => import('@iconify/icons-mdi/counter'),
  dotsV: () => import('@iconify/icons-mdi/dots-vertical'),
  error: () => import('@iconify/icons-mdi/alert-octagon-outline'),
  home: () => import('@iconify/icons-mdi/home-outline'),
  info: () => import('@iconify/icons-mdi/information-outline'),
  login: () => import('@iconify/icons-mdi/login-variant'),
  logout: () => import('@iconify/icons-mdi/logout-variant'),
  mapPin: () => import('@iconify/icons-mdi/map-marker'),
  menu: () => import('@iconify/icons-mdi/menu-open'),
  person: () => import('@iconify/icons-mdi/account'),
  palette: () => import('@iconify/icons-mdi/palette-outline'),
  post: () => import('@iconify/icons-mdi/post-outline'),
  reactLogo: () => import('@iconify/icons-mdi/react'),
  roundedCornerInv: () => import('~/util/iconsCustom/RoundedCornerInverted'),
  search: () => import('@iconify/icons-mdi/magnify'),
  support: () => import('@iconify/icons-mdi/lifebuoy'),
  success: () => import('@iconify/icons-mdi/check-circle-outline'),
  tasks: () => import('@iconify/icons-mdi/order-bool-ascending-variant'),
} as const

function Icon({name, ...props}: IconProps) {
  return <LazyIconSvg svgPathImport={icons[name]} {...props} />
}

// Helpers

// Lazily loaded IconSvg
interface LazyIconSvgProps extends Omit<IconSvgProps, 'path'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svgPathImport: () => Promise<any> // Like () => import('@iconify/icons-mdi/home')
}
function LazyIconSvg({svgPathImport, ...props}: LazyIconSvgProps) {
  const isMounted = useMountedState()
  const [svgPath, setSvgPath] = useState('')
  useEffect(() => {
    load()
  }, [])
  return <IconSvg path={svgPath} {...props} />

  async function load() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const module: any = await svgPathImport()
    if (isMounted()) setSvgPath(module.default.body)
  }
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

function IconSvg({
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
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      {...props}
      style={style}
      dangerouslySetInnerHTML={{__html: path}}
    />
  )
}
