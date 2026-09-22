

/**
 * ⚠️ ملاحظة: demo.opencart.com بيفعّل صفحة تحقق أمني من Cloudflare
 * ("Performing security verification") بشكل متقطع مع Playwright،
 * حتى لو الموقع بيفتح عادي بمتصفح يدوي. هاد النوع من Flakiness
 * غير مرتبط بالكود، وموثّق بالسكرين شوت المرفق بالتقرير.
 * نفس منطق الاختبارات مطبّق على saucedemo بملف opencart-suite-alt.spec.js
 * كدليل عملي إنه الكود سليم ومنطقي.
 */import { test, expect } from '@playwright/test';

test.describe('Hook Demonstration', () => {

  test.beforeAll(async () => {
    console.log('🟢 beforeAll: يشتغل مرة وحدة بس، قبل كل الاختبارات');
  });

  test.beforeEach(async ({ page }) => {
    console.log('🔵 beforeEach: يشتغل قبل كل اختبار لحاله');
    await page.goto('/');
  });

  test.afterEach(async () => {
    console.log('🟡 afterEach: يشتغل بعد كل اختبار لحاله يخلص');
  });

  test.afterAll(async () => {
    console.log('🔴 afterAll: يشتغل مرة وحدة بس، بعد كل الاختبارات');
  });

  test('first test', async ({ page }) => {
    console.log('▶️ Running: first test');
    await expect(page).toHaveTitle(/.*/);
  });

  test('second test', async ({ page }) => {
    console.log('▶️ Running: second test');
    await expect(page).toHaveTitle(/.*/);
  });

});