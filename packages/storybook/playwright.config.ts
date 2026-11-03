import { defineConfig } from 'playwright/test'

export default defineConfig({
  testDir: './e2e',
  // Headless pages in parallel workers compete for focus, which breaks keyboard tests.
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:6007',
    browserName: 'chromium',
  },
  webServer: {
    command:
      'npm run dev:storybook -- --host 127.0.0.1 --port 6007 --ci --no-open',
    url: 'http://127.0.0.1:6007',
    reuseExistingServer: !process.env.CI,
  },
})
