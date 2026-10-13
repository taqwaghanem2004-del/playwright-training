import { test, expect } from '@playwright/test';

test('Mock fruits API', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        await route.fulfill({
            json: [{ name: 'Strawberry', id: 21 }]
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Strawberry')).toBeVisible();
});

test('API returns 500', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        await route.fulfill({
            status: 500
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: 'error-500.png' });
});

test('Block all images', async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,svg}', route => route.abort());

    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.inventory_item').first()).toBeVisible();
});

test('Mock login success', async ({ page }) => {
    await page.route('**/api/login', route => route.fulfill({
        status: 200,
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify({ token: 'fake-token-123' })
    }));

    await page.setContent(`
        <input id="email" placeholder="Email">
        <input id="password" type="password" placeholder="Password">
        <button id="login">Login</button>
        <div id="message"></div>
        <script>
            document.getElementById('login').onclick = async () => {
                const res = await fetch('https://example.com/api/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value
                    })
                });
                document.getElementById('message').textContent =
                    res.ok ? 'Welcome back!' : 'Login failed';
            };
        </script>
    `);

    await page.fill('#email', 'anything@test.com');
    await page.fill('#password', 'wrong-password');
    await page.click('#login');

    await expect(page.locator('#message')).toHaveText('Welcome back!');
});