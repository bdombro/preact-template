import "./layout-marketing.css"

import { router as r } from "~/router"

import { BurgerIconA, TopHeader } from "./top-header"

/**
 * A layout with a header and a main section
 */
export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="layout-marketing">
			<TopHeader
				burger={
					<>
						<BurgerIconA href={r.routes.index.path} icon="home">
							Home
						</BurgerIconA>
						<BurgerIconA href={r.routes.about.path} icon="info">
							About
						</BurgerIconA>
						<BurgerIconA href="/#about" icon="building">
							About
						</BurgerIconA>
						<BurgerIconA href={r.routes.login.path} icon="login">
							Login
						</BurgerIconA>
					</>
				}
				right={
					<>
						<A href={r.routes.index.path}>Home</A>
						<A href={r.routes.about.path}>About</A>
						<A href={r.routes.login.path}>Login</A>
					</>
				}
			/>
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
}: SectionProps & { innerProps?: DivProps }) {
	return (
		<Section _p={16} {...outerProps}>
			<Div _maxW={800} _mx="auto" {...innerProps}>
				{children}
			</Div>
		</Section>
	)
}
