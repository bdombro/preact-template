import { Observable } from "@slimr/react"

const authCookieName = "auth_token"

/**
 * An observable that reflects the value of the authentication cookie
 *
 * @usage
 * ```tsx
 *   import { authCookie } from "~/foundation"
 * 	 function MyComponent() {
 *   	 authCookie.use() // subscribes to changes
 * 		 if (!authCookie.val) {
 *	 		 return r.goto(r.routes.login)
 * 		 }
 * 		 return <div>Protected content</div>
 *   }
 * ```
 */
export const authCookie = new Observable("authCookie", getCookieValue(authCookieName))

setInterval(() => authCookie.set(getCookieValue(authCookieName)), 5000)

authCookie.subscribe(async (newValue) => {
	const currentValue = getCookieValue(authCookieName)
	if (newValue !== currentValue) {
		if (!newValue) {
			await cookieStore.delete(authCookieName)
		} else {
			await cookieStore.set({ name: authCookieName, value: newValue || "", path: "/" })
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
