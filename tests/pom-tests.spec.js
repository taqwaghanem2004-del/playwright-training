import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { SearchPage } from '../pages/SearchPage.js';

test.describe('POM Tests', () => {

  test('login with valid credentials using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
  });

  test('login with invalid credentials shows error using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate('https://www.saucedemo.com/');
    await loginPage.login('wrong_user', 'wrong_pass');

    const errorText = await loginPage.getError();
    expect(errorText).toContain('Username and password do not match');
  });

  test('sort products using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const searchPage = new SearchPage(page);

    await loginPage.navigate('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await searchPage.search('lohi');
    const count = await searchPage.getResultCount();

    expect(count).toBe(6);
  });

});