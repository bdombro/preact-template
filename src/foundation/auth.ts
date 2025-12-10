import { effect, signal } from "@preact/signals"

const authCookieName = "auth_token"

/**
 * A Preact signal that reflects the value of the authentication cookie
 *
 * @usage
 * ```tsx
 *   import { authCookie } from "~/foundation"
 *   function MyComponent() {
 *     authCookie.value // subscribe to changes
 *     if (!authCookie.value) {
 *       return r.goto(r.routes.login)
 *     }
 *     return <div>Protected content</div>
 *   }
 * ```
 */
export const authCookie = signal(getCookieValue(authCookieName))

// Poll the cookie value every 5 seconds and update the signal if it changes
setInterval(() => {
	const value = getCookieValue(authCookieName)
	if (authCookie.value !== value) {
		authCookie.value = value
	}
}, 5000)

// Keep the cookieStore in sync with the signal
effect(() => {
	const newValue = authCookie.value
	const currentValue = getCookieValue(authCookieName)
	if (newValue !== currentValue) {
		if (!newValue) {
			cookieStore.delete(authCookieName)
		} else {
			cookieStore.set({ name: authCookieName, value: newValue || "", path: "/" })
		}
	}
})

/**
 * Gets the value of a cookie by name
 *
 * This method is preferered over document.cookie for reading cookies
 * because it is synchronous.
 */
function getCookieValue(name: string): string | null {
	const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
	return match ? decodeURIComponent(match[2]) : null
}
