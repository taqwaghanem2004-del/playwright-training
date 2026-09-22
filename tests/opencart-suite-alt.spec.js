import { test, expect } from '@playwright/test';

test.describe('Smoke Tests (saucedemo - stable alternative)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('homepage loads', { tag: '@smoke' }, async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('navigation menu is visible', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.locator('#login_button_container')).toBeVisible();
  });

  test('login form is visible', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.locator('#user-name')).toBeVisible();
  });

  test('login page accessible', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.locator('#login-button')).toBeVisible();
  });

});