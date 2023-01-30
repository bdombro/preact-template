import { useEffect, useState } from 'react'
import { router as r } from '~/router'
const navitems = [
  { name: 'Home', path: r.routes.index.path },
  { name: 'Hello', path: r.routes.hello.toPath({ name: 'world' }) },
  { name: 'Stack1', path: r.routes.stack1.path },
  { name: 'Planets', path: r.routes.planets.path },
  { name: '404', path: '/does-not-exist' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  return (
    <>
      <Header _h={55}>
        <Nav
          _bg="lightgray"
          _border="8px solid #ffffff77"
          _boxSizing="border-box"
          _px={4}
          _pos="fixed"
          _w="100%"
          _ta="center"
          _z={1}
          _dark={{ bg: '#555' }}
        >
          {navitems.map((item) => (
            <A
              className="small"
              key={item.name}
              href={item.path}
              _bg={item.path === location.pathname ? 'gray' : undefined}
              _c="var(--color-fg)"
              _d="inline-block"
              _p={10}
              _hover={{ bg: 'lightblue' }}
            >
              {item.name}
            </A>
          ))}
        </Nav>
      </Header>

      <Main _opacity={ready ? 1 : 0} _transition="opacity .2s ease-in-out">
        {children}
      </Main>
    </>
  )
}

Layout.Section = function LayoutSection({
  children,
  innerProps,
  ...outerProps
}: Parameters<typeof Section>[0] & { innerProps?: Parameters<typeof Div>[0] }) {
  return (
    <Section _p={16} {...outerProps}>
      <Div _maxW={800} _mx="auto" {...innerProps}>
        {children}
      </Div>
    </Section>
  )
}
