import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './',
  /* Shared settings for all the browsers */
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    browserName: 'chromium',
    headless: false,
    viewportSize: { width: 1280, height: 720 },
  },
  /* Reporter to use for test output. */
  reporter: 'list',
};

export default config;
