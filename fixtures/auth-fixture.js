const base = require('@playwright/test');

const test = base.test.extend({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/inventory.html');
    await base.expect(page.locator('.inventory_list')).toBeVisible();
    await use(page);
  },
});

module.exports = { test, expect: base.expect };