import { test, expect } from '@playwright/test'


test('should navigate to the homepage', async ({ page }) => {
	await page.goto('http://localhost:3000')
	await expect(page).toHaveURL('http://localhost:3000')
	await expect(page.locator('h1')).toHaveText('Hello World')
})
