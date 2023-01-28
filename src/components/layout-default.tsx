import { router as r } from '~/router'
const navitems = [
  { name: 'Home', path: r.routes.index.path },
  { name: 'Hello', path: r.routes.hello.toPath({ name: 'world' }) },
  { name: 'Stack1', path: r.routes.stack1.path },
  { name: 'Planets', path: r.routes.planets.path },
  { name: '404', path: '/does-not-exist' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header $h={55}>
        <Nav
          $bg="lightgray"
          $border="8px solid #ffffff77"
          $boxSizing="border-box"
          $px={4}
          $pos="fixed"
          $w="100%"
          $ta="center"
        >
          {navitems.map((item) => (
            <A
              key={item.name}
              href={item.path}
              $bg={item.path === location.pathname ? 'gray' : undefined}
              $c="black"
              $d="inline-block"
              $p={10}
              $textDecoration="none"
              _hover={{ bg: 'lightblue' }}
            >
              {item.name}
            </A>
          ))}
        </Nav>
      </Header>

      <main>{children}</main>
    </>
  )
}

Layout.Section = function LayoutSection({
  children,
  innerProps,
  ...outerProps
}: Parameters<typeof Section>[0] & { innerProps?: Parameters<typeof Div>[0] }) {
  return (
    <Section $p={16} {...outerProps}>
      <Div $maxW={800} $mx="auto" {...innerProps}>
        {children}
      </Div>
    </Section>
  )
}
