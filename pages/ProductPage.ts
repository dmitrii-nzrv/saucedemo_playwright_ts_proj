import { Page } from '@playwright/test';
import { ProductPageLocators } from '../locators/ProductPageLocators';

export class ProductPage {
  constructor(private page: Page) {}

  async logout() {
    await this.page.click(ProductPageLocators.settingIcon);
    await this.page.click(ProductPageLocators.logoutLink);
  }

  async openAboutPage() {
    await this.page.click(ProductPageLocators.settingIcon);
    await this.page.click(ProductPageLocators.aboutLink);
  }
}
