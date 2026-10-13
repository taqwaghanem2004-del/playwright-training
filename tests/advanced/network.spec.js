import { test } from '@playwright/test';

test('Log all network requests', async ({ page }) => {
    let count = 0;
    let largest = { url: '', size: 0 };

    page.on('request', request => {
        count++;
    });

    page.on('response', async response => {
        try {
            const size = (await response.body()).length;
            if (size > largest.size) largest = { url: response.url(), size };
        } catch (e) {}
    });

    await page.goto('https://www.saucedemo.com');
    await page.waitForLoadState('networkidle');

    console.log(`Total requests: ${count}`);
    console.log(`Largest: ${largest.url} (${largest.size} bytes)`);
});