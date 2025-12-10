import { useSignalEffect } from "@preact/signals"
import { authCookie } from "~/foundation"
import { router } from "~/router"

/**
 * A layout with a header and a main section
 */
export function Layout({ children }: { children: React.ReactNode }) {
	useSignalEffect(() => {
		if (authCookie.value) {
			const params = new URLSearchParams(location.search)
			const returnTo = params.get("returnTo") ?? router.routes.stack1.path
			console.debug(`[LAYOUT]: Auth cookie found, redirecting to ${returnTo}`)
			router.goto(returnTo)
		}
	})
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
}: SectionProps & { innerProps?: DivProps }) {
	return (
		<Section _p={16} {...outerProps}>
			<Div _w={273} _mx="auto" {...innerProps}>
				{children}
			</Div>
		</Section>
	)
}
