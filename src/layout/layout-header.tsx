import './layout-header.pcss'

import {classJoin} from '@slimr/styled'

import {Icon, IconKeys} from '~/foundation'
import {router as r} from '~/router'
import {useColorScheme} from '~/util/useColorScheme'

/**
 * A layout with a header and a main section
 */
export function Layout({children}: {children: React.ReactNode}) {
  const {scheme} = useColorScheme()
  const [burgerOpen, setBurgerOpen] = useState(false)
  return (
    <div className="layout-header">
      <header>
        <a className="logo" href="/">
          <img src={`/logo-${scheme}-scheme.svg`} style={{height: '100%'}} />
        </a>
        <nav className="horizontal">
          <AA href={r.routes.index.path}>Home</AA>
          <AA href="/#about">About</AA>
          <AA href={r.routes.login.path}>Login</AA>
          <a
            className={classJoin('burger-toggle', burgerOpen ? 'active' : '')}
            href="#open-burger"
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setBurgerOpen(last => !last)
            }}
          >
            <Icon name="menu" />
          </a>
        </nav>
        <div className="burger-menu" style={{display: burgerOpen ? 'flex' : 'none'}}>
          <IconA href={r.routes.index.path} icon="home">
            Home
          </IconA>
          <IconA href="/#about" icon="building">
            About
          </IconA>
          <IconA href={r.routes.login.path} icon="login">
            Login
          </IconA>
        </div>
      </header>
      <div className="main-wrapper">
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.Section = function LayoutSection({
  children,
  innerProps,
  ...outerProps
}: Parameters<typeof Section>[0] & {innerProps?: Parameters<typeof Div>[0]}) {
  return (
    <Section _p={16} {...outerProps}>
      <Div _maxW={800} _mx="auto" {...innerProps}>
        {children}
      </Div>
    </Section>
  )
}

/** An anchor element with active classname injected  */
export function AA(p: JSX.IntrinsicElements['a']) {
  return (
    <a {...p} className={classJoin(p.className, location.href.includes(p.href!) ? 'active' : '')} />
  )
}

/** An icon to go in an AA element */
export function IconA({icon, ...p}: {icon: IconKeys} & JSX.IntrinsicElements['a']) {
  return (
    <AA {...p}>
      <Icon name={icon} style={{marginRight: 16, marginTop: -4}} />
      {p.children}
    </AA>
  )
}
