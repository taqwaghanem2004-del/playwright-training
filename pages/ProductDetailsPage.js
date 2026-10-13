import { BasePage } from './BasePage.js';

export class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}