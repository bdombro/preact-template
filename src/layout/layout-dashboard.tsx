import './layout-dashboard.pcss'

import {classJoin} from '@slimr/react'

import {router as r} from '~/router'

import {IconA} from './layout-marketing'
import {Logo} from './logo'

/**
 * A layout with a header and a main section
 */
export function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="layout-dashboard sidebar">
      <Header />
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
}: SectionProps & {innerProps?: DivProps}) {
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

function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false)
  return (
    <header className="top-header">
      <div className="navbar">
        <a className="logo" href={r.routes.stack1.path}>
          <Logo height="100%" />
        </a>
        <nav className="right">
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
  )
}
