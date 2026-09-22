import { test, expect } from '@playwright/test';

// ===== 1-5 (بدون تغيير) =====
test('assertions 1-5', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await expect(page.locator('#login-button')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toBeHidden();
  await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

  await page.fill('#user-name', 'standard_user');
  await expect(page.locator('#user-name')).toHaveValue('standard_user');

  await expect(page.locator('#user-name')).toHaveAttribute('placeholder', 'Username');
});

// ===== 6. toBeEnabled =====
test('assertion 6 - toBeEnabled', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page.locator('#login-button')).toBeEnabled();
});

// ===== 7. toBeDisabled =====
test('assertion 7 - toBeDisabled', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  await expect(page.locator('#input-example input')).toBeDisabled();
});

// ===== 8. toBeChecked =====
test('assertion 8 - toBeChecked', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  const checkboxes = page.locator('input[type="checkbox"]');
  await expect(checkboxes.nth(1)).toBeChecked();
});

// ===== 9 + 10. toHaveCount و toContainText =====
test('assertions 9-10 - count and contain text', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('.inventory_item')).toHaveCount(6);
  await expect(page.locator('.title')).toContainText('Prod');
});