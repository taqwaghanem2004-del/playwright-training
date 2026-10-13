const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page.locator('.inventory_list')).toBeVisible();

  await page.context().storageState({ path: authFile });
});