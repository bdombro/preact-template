import './layout-header.pcss'

import {classJoin} from '@slimr/styled'

import {Icon} from '~/foundation'
import {router as r} from '~/router'
import {useColorScheme} from '~/util/useColorScheme'

import {IconA} from './layout-header'

/**
 * A layout with a header and a main section
 */
export function Layout({children}: {children: React.ReactNode}) {
  const {scheme} = useColorScheme()
  const [burgerOpen, setBurgerOpen] = useState(false)
  return (
    <div className="layout-header sidebar">
      <header>
        <a className="logo" href="/">
          <img src={`/logo-${scheme}-scheme.svg`} style={{height: '100%'}} />
        </a>
        <nav className="horizontal">
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
        <div className="burger-menu" style={{display: burgerOpen ? 'block' : 'none'}}>
          <IconA href="/#account" icon="account">
            Account
          </IconA>
          <IconA href={r.routes.login.path} icon="login">
            Logout
          </IconA>
        </div>
      </header>
      <div className="main-wrapper">
        <aside>
          <nav>
            <IconA href={r.routes.chats.path} icon="chat">
              Chats
            </IconA>
            <IconA href={r.routes.stack1.path} icon="building">
              Stack
            </IconA>
            <IconA href="/#account" icon="account">
              Account
            </IconA>
            <IconA href={r.routes.login.path} icon="login">
              Logout
            </IconA>
          </nav>
        </aside>
        <main>{children}</main>
        <div className="corner-wrapper">
          <Icon name="roundedCornerInv" className="corner corner1" size={10} />
          <Icon name="roundedCornerInv" className="corner corner2" size={10} horizontal />
          <Icon name="roundedCornerInv" className="corner corner3" size={14} vertical horizontal />
          <Icon name="roundedCornerInv" className="corner corner4" size={16} vertical />
        </div>
      </div>
      <div className="footer-wrapper">
        <footer>Footer</footer>
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
