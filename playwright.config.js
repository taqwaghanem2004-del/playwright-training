// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: !!process.env.CI,
    slowMo: process.env.CI ? 0 : 500,
  },

  projects: [
    {
      name: 'chromium',
      testIgnore: [/global-setup\.spec\.js/, /task2-auth\.spec\.js/],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'setup',
      testMatch: /global-setup\.spec\.js/,
    },
    {
      name: 'chromium-auth',
      testMatch: /task2-auth\.spec\.js/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
    },
    {
      name: 'firefox',
      testIgnore: [/global-setup\.spec\.js/, /task2-auth\.spec\.js/],
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: [/global-setup\.spec\.js/, /task2-auth\.spec\.js/],
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Android',
      testIgnore: [/global-setup\.spec\.js/, /task2-auth\.spec\.js/],
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile iPhone',
      testIgnore: [/global-setup\.spec\.js/, /task2-auth\.spec\.js/],
      use: { ...devices['iPhone 12'] },
    },
  ],
});