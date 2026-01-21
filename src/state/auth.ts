import { effect, signal } from "@preact/signals"

const authCookieName = "t"

/**
 * A Preact signal that reflects the value of the authentication cookie
 *
 * @usage
 * ```tsx
 *   import { gs } from "~/state"
 *   function MyComponent() {
 *     if (!gs.auth.cookie.value) {
 *       return r.goto(r.routes.login)
 *     }
 *     return <div>Protected content</div>
 *   }
 * ```
 */
export const isLoggedIn = signal(!!getCookieValue(authCookieName))

// Poll the cookie value every 5 seconds and update the signal if it changes
setInterval(() => {
	isLoggedIn.value = !!getCookieValue(authCookieName)
}, 5000)

export async function auth(p: { email: string; code: number }) {
	console.debug("[auth]:", p.email)
	const res = await fetch("/api/auth", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(p),
	})
	if (!res.ok) {
		throw new Error(`Auth request refused with status ${res.status}`)
	}
	console.debug("[auth]: success")
	isLoggedIn.value = true
}

export async function sendAuthCode(email: string) {
	console.debug("[sendAuthCode]:", email)
	const res = await fetch("/api/auth/send-code", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	})
	if (!res.ok) {
		throw new Error(`Auth code request refused with status ${res.status}`)
	}
	console.debug("[sendAuthCode]: success")
}

export function logout() {
	console.debug("[logout]: Logging out user")
	cookieStore.delete(authCookieName)
	isLoggedIn.value = false
}

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
