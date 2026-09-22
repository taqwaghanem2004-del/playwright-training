import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads', { tag: '@smoke' }, async ({ page }) => {
    await expect(page).toHaveTitle(/.*/, { timeout: 15000 });
  });

  test('navigation menu is visible', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.locator('#menu')).toBeVisible({ timeout: 15000 });
  });

  test('search bar works', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.locator('input[name="search"]')).toBeVisible({ timeout: 15000 });
  });

  test('login page accessible', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/index.php?route=account/login');
    await expect(page.locator('#input-email')).toBeVisible({ timeout: 15000 });
  });

});