import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  workers: 1,

  timeout: 50*1000,
  expect: {
      timeout: 5000
  },

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    headless: true,
    launchOptions: {
      slowMo: 1500,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});