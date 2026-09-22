import { test, expect } from '@playwright/test';

const testData = [
  { username: 'standard_user', password: 'secret_sauce', expected: 'success' },
  { username: 'wrong_user',    password: 'wrongpass',    expected: 'error' },
  { username: '',              password: '',             expected: 'error' },
  { username: 'standard_user', password: '',             expected: 'error' },
];

for (const data of testData) {
  test(`login with "${data.username}" / "${data.password}" -> ${data.expected}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', data.username);
    await page.fill('#password', data.password);
    await page.click('#login-button');

    if (data.expected === 'success') {
      await expect(page).toHaveURL(/inventory/);
    } else {
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }
  });
}