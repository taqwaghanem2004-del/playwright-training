
const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    
    // أزرار إضافة المنتجات
    this.addBackpackBtn = page.locator('#add-to-cart-sauce-labs-backpack');
    this.addBikeLightBtn = page.locator('#add-to-cart-sauce-labs-bike-light');
    
    // أجزاء السلة والدفع
    this.cartItemNames = page.locator('.inventory_item_name');
    this.checkoutBtn = page.locator('#checkout');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
  }

  async addTwoProducts() {
    await this.addBackpackBtn.click();
    await this.addBikeLightBtn.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async proceedToCheckout(firstName, lastName, postalCode) {
    await this.checkoutBtn.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
    await this.finishBtn.click();
  }
}

module.exports = { InventoryPage };