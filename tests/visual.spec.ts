import { test, expect, Page } from '@playwright/test';

test('homepage visual baseline', async ({ page }: { page: Page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Axiom Trade/i);
  const header = await page.locator('header');
  expect(await header.screenshot()).toBeTruthy();
});
