import { BasePage } from './BasePage.js';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async openProductByName(productName) {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }

  async addProductToCartByName(productName) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getCartCount() {
    const count = await this.cartBadge.count();
    return count > 0 ? await this.cartBadge.textContent() : '0';
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}