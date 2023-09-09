import './layout-header.pcss'

import {classJoin} from '@slimr/react'

import {Icon} from '~/foundation'
import {router as r} from '~/router'

import {IconA} from './layout-header'
import {Logo} from './logo'

/**
 * A layout with a header and a main section
 */
export function Layout({children}: {children: React.ReactNode}) {
  const [burgerOpen, setBurgerOpen] = useState(false)
  return (
    <div className="layout-header sidebar">
      <header>
        <div className="navbar">
          <a className="logo" href="/">
            <Logo height="100%" />
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
        </div>
      </header>
      <div className="main-wrapper">
        <aside>
          <nav>
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
        <main>
          {children}
          <div className="corners-wrapper">
            <div>
              <Icon name="roundedCornerInv" size={10} />
            </div>
            <div>
              <Icon name="roundedCornerInv" size={16} horizontal />
            </div>
            <div>
              <Icon name="roundedCornerInv" size={16} vertical horizontal />
            </div>
            <div>
              <Icon name="roundedCornerInv" size={10} vertical />
            </div>
          </div>
        </main>
      </div>
      <Footer />
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

function Footer() {
  return (
    <div className="footer-wrapper">
      <footer>Footer</footer>
    </div>
  )
}
