import { type OnSubmit, SForm, SFormError, useSFormContext } from "@slimr/react"
import { setPageMeta } from "@slimr/util"

import { GenericError, InputBox } from "~/foundation"
import { Layout } from "~/layout/layout-login"
import { Logo } from "~/layout/logo"
import { router } from "~/router"
import { gs } from "~/state"

export default function Login() {
	setPageMeta({ title: "Login" })
	const emailInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		// Focus bc autofocus isn't reliable
		emailInputRef.current?.focus()
	}, [])

	const onSubmit: OnSubmit = async (_, vals) => {
		console.debug("Login submitted")
		// Tips:
		// 1. useForm already prevents onSubmit from being called
		//    if any inputs have a truthy 'error' property
		// 2. this validation below normally happens on the backend,
		//    but we're doing it here for demo purposes
		const errors: Record<string, string> = {}

		if (vals.email === "sue@sue.com") {
			errors.email = "Email is already registered"
		}

		if (Object.keys(errors).length) {
			throw new SFormError(errors)
		}

		gs.auth.cookie.value = "demo_token_12345"
		console.debug("Login successful")
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
						ref={emailInputRef}
						required
						type="email"
					/>
					<p className="small">
						Use this form to login or register. By registering, you agree to our Terms of Service and Privacy Policy (
						<a aria-label="Terms of Service and Privacy Policy" href={router.routes.policies.path} target="_blank">
							link
							<Icon name="openInNew" size={14} style={{ marginLeft: 2 }} />
						</a>
						).
					</p>
					<br />
					<FormFooter />
				</SForm>
			</Layout.Section>
		</Layout>
	)
}

const FormFooter = () => {
	const { submitting, accepted, rejected } = useSFormContext()

	return (
		<>
			<GenericError error={rejected && "Issues found. Please correct and retry."} />
			<button className="md" style={{ width: "100%" }} type="submit">
				{accepted ? "Success!" : submitting ? "Submitting..." : "Submit"}
			</button>
		</>
	)
}
