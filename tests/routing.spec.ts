import { expect, test } from "@playwright/test"

test("logged-out", async ({ page }) => {
	await page.goto("/")
	await expect(page).toHaveTitle(/Home - Preact Template/)
	await expect(page.getByTestId("appComponent")).toBeVisible()

	await page.goto("/login")
	await expect(page).toHaveTitle(/Login - Preact Template/)
	await expect(page.getByTestId("appComponent")).toBeVisible()
	await expect(page.getByRole("button").filter({ hasText: "Login" })).toBeVisible()
})
