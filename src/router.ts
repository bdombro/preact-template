import { Router } from "@slimr/router"

import About from "./pages/about"
import Index from "./pages/index"
import Login from "./pages/login"
import NotFound from "./pages/not-found"
import Policies from "./pages/policies"
import StackTest from "./pages/stack-test"
import Support from "./pages/support"

export const router = new Router(
	{
		index: {
			component: Index,
			path: "/",
		},
		about: {
			component: About,
			path: "/about",
		},
		login: {
			component: Login,
			path: "/login",
		},
		policies: {
			component: Policies,
			path: "/policies",
		},
		stack1: {
			isStack: true,
			component: StackTest,
			path: "/stack1",
		},
		stack1Inner: {
			exact: false,
			component: StackTest,
			path: "/stack1",
		},
		support: {
			component: Support,
			path: "/support",
		},
		notFound: {
			exact: false,
			component: NotFound,
			path: "/",
		},
	},
	{
		scrollElSelector: ".layout-body > main",
	},
)
