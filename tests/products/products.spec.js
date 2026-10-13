import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage.js';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('User can sort products by price low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.sortBy('lohi');
    // ممكن هون نضيف تحقق إضافي على ترتيب الأسعار لاحقاً
  });

  test('User can open product details page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const productName = 'Sauce Labs Backpack';

    await productsPage.openProductByName(productName);
    const name = await productDetailsPage.getProductName();
    expect(name).toBe(productName);
  });
});