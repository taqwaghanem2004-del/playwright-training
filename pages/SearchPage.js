import { BasePage } from './BasePage.js';

export class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.sortDropdown = page.locator('.product_sort_container');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async search(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getResultCount() {
    return await this.productPrices.count();
  }
}