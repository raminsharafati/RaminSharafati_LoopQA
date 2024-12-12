import { test, expect, Page } from "@playwright/test";
import testData from "./testData.json"; // Import test data

// Reusable login function
async function login(page: Page): Promise<void> {
  await page.goto("https://animated-gingersnap-8cf7f2.netlify.app/");
  await page.fill("#username", "admin"); 
  await page.fill("#password", "password123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*dashboard/); // Verify successful login
}

// Test suite
test.describe("Data-driven tests for task verification", () => {
  testData.forEach(({ testName, navigationPath, task, column, tags }) => {
    test(testName, async ({ page }) => {
      // Login
      await login(page);

      // Navigate to the specified section
      await page.click(`text=${navigationPath}`);
      await expect(page).toHaveURL(
        new RegExp(`${navigationPath.toLowerCase().replace(/\s+/g, "-")}`),
      );

      // Verify task existence
      const taskSelector = `text=${task}`;
      await expect(page.locator(taskSelector)).toBeVisible();

      // Verify column placement
      const columnSelector = `xpath=//div[contains(@class, 'column') and contains(., "${column}")]/div[contains(@class, 'task') and contains(., "${task}")]`;
      await expect(page.locator(columnSelector)).toBeVisible();

      // Verify tags
      for (const tag of tags) {
        const tagSelector = `xpath=//div[contains(@class, 'task') and contains(., "${task}")]/span[contains(@class, 'tag') and contains(., "${tag}")]`;
        await expect(page.locator(tagSelector)).toBeVisible();
      }
    });
  });
});
