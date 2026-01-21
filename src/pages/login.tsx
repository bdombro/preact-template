import { type OnSubmit, SForm, SFormError, useSFormContext } from "@slimr/react"
import { setPageMeta } from "@slimr/util"

import { GenericError, InputBox } from "~/foundation"
import { Layout } from "~/layout/layout-login"
import { Logo } from "~/layout/logo"
import { router } from "~/router"
import { gs } from "~/state"

const codeAgeMax = 120 // this needs to match the server value

export default function Login() {
	setPageMeta({ title: "Login" })
	const [codeAge, setCodeAge] = useState(0)
	const codeAgeIntervalRef = useRef<NodeJS.Timeout | null>(null)
	const emailInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		// Focus bc autofocus isn't reliable
		emailInputRef.current?.focus()

		return () => {
			if (codeAgeIntervalRef.current) {
				clearInterval(codeAgeIntervalRef.current)
			}
		}
	}, [])

	const onSubmit: OnSubmit = async (_, vals) => {
		console.debug("Login submitted")
		// Tips:
		// 1. useForm already prevents onSubmit from being called
		//    if any inputs have a truthy 'error' property
		const errors: Record<string, string> = {}

		const email = vals.email as string
		const code = Number(vals.code || 0)

		if (code) {
			await auth(email, code)
		} else {
			await sendCode(email)
		}
	}

	async function auth(email: string, code: number) {
		try {
			await gs.auth.auth({ email, code })
		} catch (e) {
			console.error(e)
			throw new SFormError({ _form: "The code entered is invalid." })
		}
	}

	async function sendCode(email: string) {
		try {
			await gs.auth.sendAuthCode(email)
		} catch (e) {
			console.error(e)
			throw new SFormError({ _form: "Failed to send authentication code. Please try again." })
		}

		if (!codeAge) {
			codeAgeIntervalRef.current = setInterval(() => {
				setCodeAge((age) => age + 1)
			}, 1000)
		}
		setCodeAge(1)
	}

	return (
		<Layout>
			<Layout.Section>
				<a href={router.routes.index.path} title="go home">
					<Logo height={70} _mb={20} />
				</a>
				<SForm onSubmit={onSubmit}>
					<InputBox
						autoComplete="username"
						autoFocus
						label="email"
						name="email"
						onInput={() => {
							if (codeAgeIntervalRef.current) {
								clearInterval(codeAgeIntervalRef.current)
							}
							setCodeAge(0)
						}}
						ref={emailInputRef}
						required
						type="email"
					/>
					{codeAge > 0 ? (
						<>
							<InputBox autoFocus label="code" name="code" required type="number" />
							<p className="small">
								Please enter the verification code sent to your email address to complete the login process.&nbsp;
								{codeAge < codeAgeMax ? (
									<>You may resend in {Math.max(0, codeAgeMax - codeAge)} seconds.</>
								) : (
									<a
										href="#resend"
										onClick={(e) => {
											e.preventDefault()
											sendCode(emailInputRef.current!.value)
										}}
									>
										Resend?
									</a>
								)}
							</p>
						</>
					) : (
						<p className="small">
							Use this form to login or register. By registering, you agree to our Terms of Service and Privacy Policy (
							<a aria-label="Terms of Service and Privacy Policy" href={router.routes.policies.path} target="_blank">
								link
								<Icon name="openInNew" size={14} style={{ marginLeft: 2 }} />
							</a>
							).
						</p>
					)}
					<br />
					<FormFooter />
				</SForm>
			</Layout.Section>
		</Layout>
	)
}

function FormFooter() {
	const { submitting, rejected } = useSFormContext()

	return (
		<>
			<GenericError error={rejected && "Issues found. Please correct and retry."} />
			<button className="md" style={{ width: "100%" }} type="submit">
				{submitting ? "Submitting..." : "Submit"}
			</button>
		</>
	)
}
