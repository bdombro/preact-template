import { authCookie } from "~/foundation"
import { router } from "~/router"

import "./layout-dashboard.css"
import { useSignalEffect } from "@preact/signals"
import { BurgerIconA, NavLogo, TopHeader } from "./top-header"

/**
 * A layout with a header and a main section
 */
export function Layout({ children }: { children: React.ReactNode }) {
	useSignalEffect(() => {
		if (!authCookie.value) {
			console.debug("[LAYOUT]: No auth cookie, redirecting to login")
			router.goto(router.routes.login, { returnTo: router.current.path })
		}
	})

	return (
		<div className="layout-dashboard">
			<TopHeader
				burger={
					<>
						<BurgerIconA href="/#account" icon="account">
							Account
						</BurgerIconA>
						<BurgerIconA href={router.routes.login.path} icon="login">
							Logout
						</BurgerIconA>
					</>
				}
				left={<NavLogo href={router.routes.stack1.path} />}
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
}: SectionProps & { innerProps?: DivProps }) {
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
		<div className="corners-wrapper">
			<div>
				<Icon name="roundedCornerInv" size={10} />
			</div>
			<div>
				<Icon name="roundedCornerInv" size={10} horizontal />
			</div>
			<div>
				<Icon name="roundedCornerInv" size={10} vertical horizontal />
			</div>
			<div>
				<Icon name="roundedCornerInv" size={10} vertical />
			</div>
		</div>
	)
}

function Footer() {
	return (
		<footer className="bottom-footer">
			<nav>
				<FooterIconA href={router.routes.stack1.path} icon="building" title="Stacks example" />
				<FooterIconA href="/#account" icon="account" title="Account" />
				<FooterIconA href={router.routes.login.path} icon="login" title="Log in" />
			</nav>
		</footer>
	)
}

function FooterIconA({ icon, ...p }: { icon: IconKeys } & AProps) {
	return (
		<A {...p}>
			<Icon name={icon} />
		</A>
	)
}

function Sidebar() {
	const [isMini, setIsMini] = useState(false)

	function logout(e: React.MouseEvent) {
		e.preventDefault()
		authCookie.value = null
	}

	return (
		<aside className={isMini ? "mini" : undefined}>
			<nav>
				<SidebarIconA href={router.routes.stack1.path} icon="building">
					Stack
				</SidebarIconA>
				<SidebarIconA href="/#account" icon="account">
					Account
				</SidebarIconA>
				<SidebarIconA href="#logout" onClick={logout} icon="login">
					Logout
				</SidebarIconA>
			</nav>
			<button
				className="ghost minimize"
				onClick={() => setIsMini((p) => !p)}
				title={isMini ? "expand sidebar" : "collapse sidebar"}
				type="button"
			>
				{isMini ? (
					<Icon name="arrowExpand" />
				) : (
					<>
						<Icon name="arrowCollapse" size={20} /> minimize
					</>
				)}
			</button>
		</aside>
	)
}

function SidebarIconA({ icon, ...p }: { icon: IconKeys } & AProps) {
	return (
		<A {...p}>
			<Icon name={icon} />
			<div>{p.children}</div>
		</A>
	)
}
