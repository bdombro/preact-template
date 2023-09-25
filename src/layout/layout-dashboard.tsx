import './layout-dashboard.pcss'

import {router as r} from '~/router'

import {BurgerIconA, NavA, NavLogo, TopHeader} from './top-header'

/**
 * A layout with a header and a main section
 */
export function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="layout-dashboard">
      <TopHeader
        burger={
          <>
            <BurgerIconA href="/#account" icon="account">
              Account
            </BurgerIconA>
            <BurgerIconA href={r.routes.login.path} icon="login">
              Logout
            </BurgerIconA>
          </>
        }
        left={<NavLogo href={r.routes.stack1.path} />}
      />
      <div className="main-wrapper">
        <Sidebar />
        <main>
          {children}
          <Corners />
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

function Corners() {
  return (
    <>
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
    </>
  )
}

function Footer() {
  return (
    <footer className="bottom-footer">
      <nav>
        <FooterIconA href={r.routes.stack1.path} icon="building" />
        <FooterIconA href="/#account" icon="account" />
        <FooterIconA href={r.routes.login.path} icon="login" />
      </nav>
    </footer>
  )
}

function FooterIconA({icon, ...p}: {icon: IconKeys} & AProps) {
  return (
    <NavA {...p}>
      <Icon name={icon} />
    </NavA>
  )
}

function Sidebar() {
  return (
    <aside>
      <nav>
        <SidebarIconA href={r.routes.stack1.path} icon="building">
          Stack
        </SidebarIconA>
        <SidebarIconA href="/#account" icon="account">
          Account
        </SidebarIconA>
        <SidebarIconA href={r.routes.login.path} icon="login">
          Logout
        </SidebarIconA>
      </nav>
    </aside>
  )
}

function SidebarIconA({icon, ...p}: {icon: IconKeys} & AProps) {
  return (
    <NavA {...p}>
      <Icon name={icon} />
      <div>{p.children}</div>
    </NavA>
  )
}
