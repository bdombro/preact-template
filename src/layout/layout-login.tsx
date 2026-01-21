import { useSignalEffect } from "@preact/signals"
import { router } from "~/router"
import { gs } from "~/state"

/**
 * A layout with a header and a main section
 */
export function Layout({ children, className, ...divProps }: DivProps) {
	useSignalEffect(() => {
		if (gs.auth.isLoggedIn.value) {
			const params = new URLSearchParams(location.search)
			const returnTo = params.get("returnTo") ?? router.routes.stack1.toPath()
			console.debug(`[LAYOUT]: Auth cookie found, redirecting to ${returnTo}`)
			router.goto(returnTo)
		}
	})
	return (
		<div className={`${className || ""} layout-login`} {...divProps}>
			<div className="layout-body">
				<Main _ai="center" _d="flex" _jc="center" _my={40} _pt="var(--statusbar-height)">
					{children}
				</Main>
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
			<Div _w={273} _mx="auto" {...innerProps}>
				{children}
			</Div>
		</Section>
	)
}
