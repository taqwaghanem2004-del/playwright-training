const { test, expect } = require('../fixtures/auth-fixture');

test('Inventory page shows 6 products without logging in again', async ({ loggedInPage }) => {
await expect(loggedInPage.locator('.inventory_item')).toHaveCount(6);
});

test('Add one product and verify cart badge shows 1', async ({ loggedInPage }) => {
  await loggedInPage.locator('#add-to-cart-sauce-labs-backpack').click();
  await expect(loggedInPage.locator('.shopping_cart_badge')).toHaveText('1');
});