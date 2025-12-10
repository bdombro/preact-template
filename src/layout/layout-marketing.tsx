import { authCookie } from "~/foundation"
import { router } from "~/router"

import "./layout-marketing.css"
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
						<BurgerIconA href={router.routes.index.path} icon="home">
							Home
						</BurgerIconA>
						<BurgerIconA href={router.routes.about.path} icon="info">
							About
						</BurgerIconA>
						<BurgerIconA href="/#about" icon="building">
							About
						</BurgerIconA>
						<BurgerIconA href={router.routes.login.path} icon="login">
							{authCookie.value ? "Dashboard" : "Login"}
						</BurgerIconA>
					</>
				}
				right={
					<>
						<A href={router.routes.index.path}>Home</A>
						<A href={router.routes.about.path}>About</A>
						<A href={router.routes.login.path}>{authCookie.value ? "Dashboard" : "Login"}</A>
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
