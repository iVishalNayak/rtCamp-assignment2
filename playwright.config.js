// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'playwright-report' }]], // Enable HTML Report
  use: {
    screenshot: 'only-on-failure', // Capture screenshots if a test fails
    trace: 'on-first-retry', // Capture traces for debugging on retries
    headless: false,  // Run in headed mode
    slowMo: 100000      // Slow down actions (1000ms = 1 sec per step)
  }
});
