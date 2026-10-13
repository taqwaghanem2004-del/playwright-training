import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage.js';
import { CartPage } from '../../pages/CartPage.js';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Product added to cart appears with correct count', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const productName = 'Sauce Labs Backpack';

    await productsPage.openProductByName(productName);
    await productDetailsPage.addToCart();

    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('Product is verified inside cart page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const productName = 'Sauce Labs Backpack';

    await productsPage.openProductByName(productName);
    await productDetailsPage.addToCart();
    await productsPage.goToCart();

    const isInCart = await cartPage.isProductInCart(productName);
    expect(isInCart).toBe(true);
  });
});