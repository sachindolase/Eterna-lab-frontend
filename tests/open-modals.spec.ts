import { test, expect, Page } from '@playwright/test';

test('open signup and login modals', async ({ page }: { page: Page }) => {
  await page.goto('http://localhost:3000');

  // Click Login and assert dialog heading appears
  const loginButton = page.getByRole('button', { name: 'Login' }).first();
  await loginButton.click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Close dialog via Escape key (robust)
  await page.keyboard.press('Escape');

  // Click Sign up and assert dialog heading appears
  const signUpButton = page.getByRole('button', { name: 'Sign up' }).first();
  await signUpButton.click();
  await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
  await page.keyboard.press('Escape');
});
