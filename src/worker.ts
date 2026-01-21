import { env } from "cloudflare:workers"
import { createUid } from "@slimr/util"

interface User {
	id: string
	email: string
	createdAt: string
	updatedAt: string
	code: number | null
	codeAttempts: number | null
	codeCreatedAt: number | null
}

export default {
	/**
	 * This is the standard fetch handler for a Cloudflare Worker
	 *
	 * @param request - The request submitted to the Worker from the client
	 * @param env - The interface to reference bindings declared in wrangler.jsonc
	 * @param ctx - The execution context of the Worker
	 * @returns The response to be sent back to the client
	 */
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url)
		const cookies = cookieParse(request)
		const authToken = cookies.t ? decodeURIComponent(cookies.t) : null

		if (url.pathname.startsWith("/api")) {
			// handle POST request for JWT with email and code
			if (url.pathname === "/api/auth") {
				if (request.method === "POST") {
					return authPost(request)
				}
			}

			// handle POST request to send code to email
			if (url.pathname === "/api/auth/send-code") {
				if (request.method === "POST") {
					return authSendCodePost(request)
				}
			}

			// handle GET request to /api/user to return current user
			if (url.pathname === "/api/user") {
				if (request.method === "GET") {
					const { sub: userId } = await jwt.read(authToken)
					if (userId === null) {
						return new Response("Unauthorized", { status: 401 })
					}

					const user = (await env.db.prepare(`SELECT * FROM users WHERE id = ?`).bind(userId).first()) as
						| User
						| undefined

					if (!user) {
						return new Response("User not found", { status: 404 })
					}

					return Response.json(user)
				}
			}

			// handle GET request to /api/users to return all users
			if (url.pathname === "/api/users") {
				const { sub: userId } = await jwt.read(authToken)
				if (userId !== "0") {
					return new Response("Unauthorized", { status: 401 })
				}
				if (request.method === "GET") {
					const returnValue = await env.db.prepare(`SELECT * FROM users`).run()
					return Response.json(returnValue)
				}
			}
		}

		return new Response("Not found", { status: 404 })
	},
} satisfies ExportedHandler<Env>

async function authSendCodePost(request: Request): Promise<Response> {
	// check if request has a body
	const body = await bodyParse(request)

	const email = body.email as string | undefined
	if (!email) {
		return new Response("email is required", { status: 400 })
	}

	// Get user from database
	let user = (await env.db.prepare(`SELECT * FROM users WHERE email = ?`).bind(email).first()) as User | undefined

	// If user doesn't exist, create a new user
	if (!user) {
		const id = createUid()
		await env.db.prepare(`INSERT INTO users (id, email) VALUES (?, ?)`).bind(id, email).run()
		user = (await env.db.prepare(`SELECT * FROM users WHERE email = ?`).bind(email).first()) as User
	}

	// if codeRequestedAt is less than 2 minutes ago, return 400
	if (user.codeCreatedAt && Date.now() - user.codeCreatedAt < 120_000) {
		return new Response("Code already requested recently", { status: 400 })
	}

	// Generate a 4-digit code
	const code = Math.floor(1000 + Math.random() * 9000)

	await env.db
		.prepare(`UPDATE users SET code = ?, codeCreatedAt = ?, codeAttempts = 0 WHERE email = ?`)
		.bind(code, Date.now(), email)
		.run()

	// Send the code via email using ZeptoMail
	const subject = "Your Toody Login Code"
	const htmlbody = `<p>Your login code is: <strong>${code}</strong></p><p>This code will expire in 10 minutes.</p>`

	// await sendMail({ to: email, subject, htmlbody })
	console.log(`Sent code ${code} to email ${email}`)

	return new Response("Code sent", { status: 200 })
}

async function authPost(request: Request): Promise<Response> {
	const body = await bodyParse(request)
	const email = body.email as string | undefined
	const code = body.code as number | undefined
	if (!email || !code) {
		return new Response("email and code are required", { status: 400 })
	}

	// Get user from database
	const user = (await env.db.prepare(`SELECT * FROM users WHERE email = ?`).bind(email).first()) as User | undefined

	if (!user) {
		return new Response("Invalid email", { status: 400 })
	}

	// check if codeAttempts is more than 3
	if (user.codeAttempts && user.codeAttempts >= 3) {
		return new Response("Too many invalid attempts", { status: 400 })
	}

	if (!user.codeCreatedAt || Date.now() > user.codeCreatedAt + 10 * 60 * 1000) {
		return new Response("Code has expired", { status: 400 })
	}

	if (user.code !== code) {
		const attempts = (user.codeAttempts || 0) + 1
		await env.db.prepare(`UPDATE users SET codeAttempts = ? WHERE email = ?`).bind(attempts, email).run()
		return new Response("Invalid email or code", { status: 400 })
	}

	// Clear the code and attempts after successful login
	await env.db
		.prepare(`UPDATE users SET code = NULL, codeAttempts = 0, codeCreatedAt = NULL WHERE email = ?`)
		.bind(email)
		.run()

	const token = encodeURIComponent(await jwt.create(user.id))

	const response = new Response("Authenticated", { status: 200 })
	response.headers.append("Set-Cookie", `t=${token}; Path=/; Max-Age=${7 * 24 * 60 * 60}`)

	return response
}

async function bodyParse(request: Request): Promise<any> {
	try {
		const json = (await request.json()) as Record<string, any>
		if (json && typeof json === "object") {
			return json
		}
		return null
	} catch (e) {
		return null
	}
}

function cookieParse(request: Request): Record<string, string> {
	const cookieHeader = request.headers.get("Cookie")
	if (!cookieHeader) {
		return {}
	}
	const cookies: Record<string, string> = {}
	const cookiePairs = cookieHeader.split(";")
	for (const pair of cookiePairs) {
		const [name, value] = pair.trim().split("=")
		cookies[name] = value
	}
	return cookies
}

const jwt = {
	async create(sub: string): Promise<string> {
		const header = { alg: "HS256", typ: "JWT" }
		const iat = Math.floor(Date.now() / 1000)
		const payload = { sub, iat }

		// Encode header and payload
		const encodedHeader = btoa(JSON.stringify(header))
		const encodedPayload = btoa(JSON.stringify(payload))
		const data = `${encodedHeader}.${encodedPayload}`

		// Create signature using HMAC-SHA256
		const encoder = new TextEncoder()
		const key = await crypto.subtle.importKey(
			"raw",
			encoder.encode(env.JWT_SECRET),
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign"],
		)

		const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data))

		// Convert signature to base64
		const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))

		const token = `${data}.${encodedSignature}`
		return token
	},

	async read(token: string | null): Promise<{ sub: string | null; iat: number | null }> {
		if (!token) return { sub: null, iat: 0 }

		const parts = token.split(".")
		if (parts.length !== 3) return { sub: null, iat: 0 }

		const [encodedHeader, encodedPayload, encodedSignature] = parts

		// Verify signature
		const encoder = new TextEncoder()
		const key = await crypto.subtle.importKey(
			"raw",
			encoder.encode(env.JWT_SECRET),
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["verify"],
		)

		const signature = Uint8Array.from(atob(encodedSignature), (c) => c.charCodeAt(0))
		const isValid = await crypto.subtle.verify(
			"HMAC",
			key,
			signature,
			encoder.encode(`${encodedHeader}.${encodedPayload}`),
		)

		if (!isValid) return { sub: null, iat: 0 }

		const payload = JSON.parse(atob(encodedPayload))
		return payload
	},
}

/** Send an email using Zoho Zeptomail */
async function sendMail({ to, subject, htmlbody }: { to: string; subject: string; htmlbody: string }) {
	await fetch("https://api.zeptomail.com/v1.1/email", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: env.ZEPTOMAIL_TOKEN,
		},
		body: JSON.stringify({
			from: {
				address: "brian@toodyapp.com",
				name: "Brian from toodyapp.com",
			},
			to: [
				{
					email_address: {
						address: to,
						// "name": "Brian"
					},
				},
			],
			subject,
			htmlbody,
		}),
	})
}
