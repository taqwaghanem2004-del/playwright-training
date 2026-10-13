
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test('Complete SauceDemo Checkout Flow using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // 1. تسجيل الدخول ببيانات صحيحة
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. التأكد من ظهور صفحة المنتجات
  await expect(inventoryPage.inventoryContainer).toBeVisible();

  // 3. إضافة منتجين مختلفين للسلة
  await inventoryPage.addTwoProducts();

  // 4. التأكد من أن شارة السلة تعطي الرقم 2
  await expect(inventoryPage.cartBadge).toHaveText('2');

  // 5. فتح السلة والتحقق من وجود المنتجين
  await inventoryPage.goToCart();
await expect(inventoryPage.cartItemNames).toHaveText([
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light'
]);
  // 6. إتمام عملية الدفع والتحقق من رسالة التأكيد
  await inventoryPage.proceedToCheckout('Taqwa', 'Ghanem', '12345');
  await expect(inventoryPage.completeHeader).toHaveText('Thank you for your order!');
  await page.screenshot({ path: 'evidence/order-confirmation.png', fullPage: true });
});