import { test, expect } from '@playwright/test';

test.describe('Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('login with valid credentials', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory/);
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'wrong_pass');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('sorting products returns correctly ordered results', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.selectOption('.product_sort_container', 'lohi'); 

    const firstPrice = await page.locator('.inventory_item_price').first().textContent();
    expect(firstPrice).toBe('$7.99'); 
  });

});