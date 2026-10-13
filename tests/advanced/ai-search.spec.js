import { test, expect } from '@playwright/test';

test('Sort by price low to high shows prices in ascending order', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'problem_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices.length).toBeGreaterThanOrEqual(3);
  expect(prices).toEqual(sorted);
});