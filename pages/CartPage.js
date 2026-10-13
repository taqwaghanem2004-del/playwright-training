import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async isProductInCart(productName) {
    return await this.itemNames.filter({ hasText: productName }).count() > 0;
  }
}