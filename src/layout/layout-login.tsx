/**
 * A layout with a header and a main section
 */
export function Layout({children}: {children: React.ReactNode}) {
  return (
    <Main _ai="center" _d="flex" _jc="center" _my={40} _pt="var(--statusbar-height)">
      {children}
    </Main>
  )
}

Layout.Section = function LayoutSection({
  children,
  innerProps,
  ...outerProps
}: Parameters<typeof Section>[0] & {innerProps?: Parameters<typeof Div>[0]}) {
  return (
    <Section _p={16} {...outerProps}>
      <Div _maxW={500} _mx="auto" {...innerProps}>
        {children}
      </Div>
    </Section>
  )
}
