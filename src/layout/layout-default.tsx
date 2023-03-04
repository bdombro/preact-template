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
    <>
      <Header
        _bg="var(--color-gray80)"
        _d="flex"
        _h={45}
        _jc="space-between"
        _pos="fixed"
        _w="100%"
        _dark={{bg: 'var(--color-gray40)'}}
      >
        <A
          className="small"
          href="/"
          _c="var(--color-fg)"
          _d="inline-block"
          _lineHeight={37}
          _px={13}
          _pt={3}
          _pb={5}
          _hover={{bg: 'var(--color-primary)'}}
        >
          <Logo height="100%" />
        </A>
        <nav>
          {navitems.map(item => (
            <A
              key={item.name}
              href={item.path}
              className="small"
              _c="var(--color-fg)"
              _d="inline-block"
              _lineHeight={45}
              _px={13}
              _hover={{bg: 'var(--color-primary)'}}
            >
              {item.name}
            </A>
          ))}
        </nav>
      </Header>
      <Div _h={80} />

      <main>{children}</main>
    </>
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
