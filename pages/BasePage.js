export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}