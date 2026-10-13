import { test, expect } from '@playwright/test';

// ============================================
// 1) NETWORK INTERCEPTION / MOCKING (@mock)
// ============================================

test('Mock successful API response @mock', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        await route.fulfill({
            json: [{ name: 'Strawberry', id: 21 }]
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Strawberry')).toBeVisible();
});

test('Block all image requests @mock', async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,svg}', route => route.abort());

    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.inventory_item').first()).toBeVisible();
});

// ============================================
// 2) SMOKE TEST (@smoke) — اختبار أساسي سريع
// ============================================

test('User can login successfully @smoke', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.title')).toBeVisible();
});

// ============================================
// 3) INTENTIONAL FAILURE — لتجربة Screenshot/Video/Trace
// ============================================

test('Intentional failure for evidence capture @smoke', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page.locator('.title')).toBeVisible();
});

// ============================================
// 4) MOBILE EMULATION (@mobile)
// ============================================

test('Login works on mobile @mobile', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.title')).toBeVisible();
});