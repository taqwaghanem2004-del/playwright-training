import { test, expect } from '@playwright/test';

test('Intentional failure', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page.locator('.title')).toBeVisible();
});

test('Screenshots at 3 points', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.screenshot({ path: 'screenshots/1-login.png' });

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.screenshot({ path: 'screenshots/2-products.png' });

    await page.locator('.inventory_item_name').first().click();
    await page.screenshot({ path: 'screenshots/3-product-details.png' });
});
test('Screenshot of one element', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.locator('.inventory_item').first().screenshot({
        path: 'screenshots/4-first-product.png'
    });
});