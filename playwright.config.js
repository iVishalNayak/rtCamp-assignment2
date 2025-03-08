// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'playwright-report' }]], // Enable HTML Report
  use: {
    screenshot: 'only-on-failure', // Capture screenshots if a test fails
    trace: 'on', // Capture traces for debugging on retries
    headless: false,  // Run in headed mode
    slowMo: 1000,     // Slow down execution to see steps
    video: 'on',      // Record video of test execution
  }
});
