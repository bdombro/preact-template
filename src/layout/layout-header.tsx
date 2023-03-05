import './layout-header.pcss'

import {router as r} from '~/router'

import {Logo} from './logo'

const navitems = [
  {name: 'Features', path: r.routes.index.path},
  {name: 'About', path: r.routes.index.path},
  {name: 'Login', path: r.routes.login.path},
]

/**
 * A layout with a header and a main section
 */
export function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="layout-header">
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
