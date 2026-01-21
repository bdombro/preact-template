import { router } from "~/router"
import { gs } from "~/state"

import "./layout-marketing.css"
import { Logo } from "./logo"
import { BurgerIconA, TopHeader } from "./top-header"

/**
 * A layout with a header and a main section
 */
export function Layout({ children, className, ...divProps }: DivProps) {
	return (
		<div className={`${className || ""} layout-marketing`} {...divProps}>
			<TopHeader
				burger={
					<>
						<BurgerIconA href={router.routes.index.path} icon="home">
							Home
						</BurgerIconA>
						<BurgerIconA href={router.routes.about.path} icon="info">
							About
						</BurgerIconA>
						<BurgerIconA href={router.routes.login.path} icon="login">
							{gs.auth.isLoggedIn.value ? "Dashboard" : "Login"}
						</BurgerIconA>
					</>
				}
				right={
					<>
						<A href={router.routes.index.path}>Home</A>
						<A href={router.routes.about.path}>About</A>
						<A href={router.routes.login.path}>{gs.auth.isLoggedIn.value ? "Dashboard" : "Login"}</A>
					</>
				}
			/>
			<div className="layout-body">
				<main>{children}</main>
			</div>
		</div>
	)
}

Layout.Footer = function LayoutFooter() {
	return (
		<footer className="LayoutFooter">
			<Layout.Section className="section-1">
				<div className="left">
					<Logo />
				</div>
				<div className="right">
					<a href={router.routes.support.toPath()}>Help & Support</a>
					<a href={router.routes.policies.toPath()}>Terms & Conditions</a>
					<a href={router.routes.policies.toPath()}>Privacy Policy</a>
				</div>
			</Layout.Section>
			<Layout.Section className="section-2">
				<p className="copy">&copy; {new Date().getFullYear()} BTEK.CC LLC. All rights reserved.</p>
			</Layout.Section>
		</footer>
	)
}

Layout.Section = function LayoutSection({
	children,
	innerProps,
	...outerProps
}: SectionProps & { innerProps?: DivProps }) {
	return (
		<Section _p={16} {...outerProps}>
			<Div _maxw={1200} _mx="auto" {...innerProps}>
				{children}
			</Div>
		</Section>
	)
}
