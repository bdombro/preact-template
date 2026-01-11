import { setPageMeta } from "@slimr/util"

import { Layout } from "~/layout/layout-marketing"
import { router } from "~/router"

export default function Support() {
	const { title, description } = setPageMeta({
		title: "Help and Support",
		description: "Welcome to the official help site, where you can find tips, guides and support.",
	})
	return (
		<Layout className="Support">
			<Layout.Section>
				<h1>{title}</h1>
				<p>{description}</p>
			</Layout.Section>

			<Layout.Section>
				<h2>Getting Started</h2>
				<p>
					To get started, simply create an account by <a href={router.routes.login.path}>logging in</a>. Once logged in,
					you can start using the app.
				</p>
				<p>
					Adding todos: After logging in, you can add new todos by moving your cursor, using keyboard or arrows, to the
					bottom of the todo list and typing your task.
				</p>
				<p>
					Editing todos: Move the cursor within any todo and edit using your keyboard -- kinda like editing using a text
					editor! To mark a todo as complete, simply click the checkbox next to it.
				</p>
			</Layout.Section>

			<Layout.Section>
				<h2>FAQs</h2>
				<h3>How do I reset my password?</h3>
				<p>
					To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions
					to receive a password reset email.
				</p>
			</Layout.Section>

			<Layout.Section _mb={150}>
				<h2>Contact Support</h2>
				<p>
					If you need assistance, please reach out to our support team at{" "}
					<a href="mailto:toodyhelp@btek.cc">help@btek.cc</a>
				</p>
			</Layout.Section>
		</Layout>
	)
}
