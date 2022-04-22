import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	retries: process.env.CI ? 2 : 0,
	forbidOnly: !!process.env.CI,
	use: {
		trace: 'on-first-retry'
	},
	testIgnore: [
		'__tests__/**'
	]
}

export default config
