import { setPageMeta } from "@slimr/util"

import { Layout } from "~/layout/layout-marketing"

export default function Policies() {
	const { title, description } = setPageMeta({
		title: "Site Policies",
		description: "Our policies for Terms of Service and Privacy.",
	})
	return (
		<Layout>
			<Layout.Section>
				<h1>{title}</h1>
				<p>{description}</p>
			</Layout.Section>
			<Layout.Section>
				<h2>Terms of Service</h2>
				<div style={{ marginBottom: "1.5em" }}>
					<p>
						<strong>1. Acceptance of Terms</strong>
					</p>
					<p>By registering and using this site, you agree to comply with these terms.</p>

					<p>
						<strong>2. Account Responsibility</strong>
					</p>
					<p>
						You are responsible for maintaining the confidentiality of your login credentials. Any activity on your
						account is your responsibility.
					</p>

					<p>
						<strong>3. Acceptable Use</strong>
					</p>
					<p>You may not use the site for illegal purposes or to harm the site, its users, or third parties.</p>

					<p>
						<strong>4. Termination</strong>
					</p>
					<p>We reserve the right to suspend or terminate accounts that violate these terms.</p>

					<p>
						<strong>5. Limitation of Liability</strong>
					</p>
					<p>We provide the site “as is” and are not liable for any damages resulting from its use.</p>

					<p>
						<strong>6. Changes to Terms</strong>
					</p>
					<p>
						We may update these terms at any time. Continued use of the site constitutes acceptance of the updated
						terms.
					</p>
				</div>
			</Layout.Section>
			<Layout.Section>
				<h2>Privacy Policy</h2>
				<div style={{ marginBottom: "1.5em" }}>
					<p>
						<strong>1. Data We Collect</strong>
					</p>
					<p>
						We collect personal data you provide during registration, including your email and login credentials. We may
						also track anonymous usage data (e.g., daily active users) to improve our service. This data cannot be
						linked to you personally.
					</p>

					<p>
						<strong>2. Purpose of Data Collection</strong>
					</p>
					<ul>
						<li>To authenticate your account and allow access to our services.</li>
						<li>To monitor anonymous usage for service improvement.</li>
					</ul>

					<p>
						<strong>3. Data Storage and Security</strong>
					</p>
					<p>
						Your personal data is stored securely and only accessible to authorized personnel. We implement appropriate
						technical and organizational measures to protect your data.
					</p>

					<p>
						<strong>4. Your Rights</strong>
					</p>
					<p>You have the right to:</p>
					<ul>
						<li>Access the personal data we hold about you.</li>
						<li>Correct any inaccuracies.</li>
						<li>Request deletion of your personal data.</li>
					</ul>
					<p>
						To exercise these rights, please contact us at: <a href="mailto:help@btek.cc">help@btek.cc</a>
					</p>

					<p>
						<strong>5. Cookies</strong>
					</p>
					<p>
						We use cookies strictly necessary for login authentication. No tracking cookies are used without your
						consent.
					</p>

					<p>
						<strong>6. Updates</strong>
					</p>
					<p>We may update this policy from time to time. The latest version will always be available on this page.</p>
				</div>
			</Layout.Section>
		</Layout>
	)
}
