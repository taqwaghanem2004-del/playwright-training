import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage.js';
import { CartPage } from '../../pages/CartPage.js';

test.describe('End-to-End Purchase Flow', () => {
  test('User can login, sort products, open a product, add it to cart, and verify it in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    await productsPage.sortBy('lohi');

    const productName = 'Sauce Labs Backpack';
    await productsPage.openProductByName(productName);
    const openedProductName = await productDetailsPage.getProductName();
    expect(openedProductName).toBe(productName);

    await productDetailsPage.addToCart();
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');

    await productsPage.goToCart();
    await expect(page).toHaveURL(/cart/);

    const isInCart = await cartPage.isProductInCart(productName);
    expect(isInCart).toBe(true);
    expect(await cartPage.getItemCount()).toBe(1);
  });
});