import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	retries: process.env.CI ? 2 : 0,
	forbidOnly: !!process.env.CI,
	reporter: process.env.CI ? 'github' : 'list',

	use: {
		trace: 'on',
	},
	testIgnore: ['__tests__/**'],
};

export default config;
