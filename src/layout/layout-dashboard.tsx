import './layout-header.pcss'

import {Icon} from '~/foundation'
import {router as r} from '~/router'

import {Logo} from './logo'

const navitems = [
  {name: 'Account', path: r.routes.index.path},
  {name: 'Logout', path: r.routes.login.path},
]

/**
 * A layout with a header and a main section
 */
export function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="layout-header sidebar">
      <div className="header-wrapper">
        <header>
          <a className="logo" href="/">
            <Logo height="100%" />
          </a>
          <nav>
            {navitems.map(item => (
              <a key={item.name} href={item.path}>
                {item.name}
              </a>
            ))}
          </nav>
        </header>
      </div>
      <div className="main-wrapper">
        <aside>Sidebar</aside>
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
