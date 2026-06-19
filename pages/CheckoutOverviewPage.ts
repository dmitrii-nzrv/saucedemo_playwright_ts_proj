import { Page } from '@playwright/test';
import { checkoutOverviewLocators } from '../locators/CheckoutOverviewLocators';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  async getCheckoutOverviewElements() {
    return {
      pageInfo: this.page.locator(checkoutOverviewLocators.pageInfo),
      cancelButton: this.page.locator(checkoutOverviewLocators.cancelButton),
      finishButton: this.page.locator(checkoutOverviewLocators.finishButton),
    };
  }

  async getOverviewProducts() {
    const allNames = await this.page
      .locator(checkoutOverviewLocators.productNames)
      .allTextContents();
    const allDescriptions = await this.page
      .locator(checkoutOverviewLocators.productDesc)
      .allTextContents();
    const allPrices = await this.page
      .locator(checkoutOverviewLocators.productPrices)
      .allTextContents();

    const allProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescriptions[i].trim(),
      price: allPrices[i].trim(),
    }));
    return allProducts;
  }
  async getItemTotal() {
    const text = await this.page.locator(checkoutOverviewLocators.itemTotal).textContent();
    return text?.replace('Item total: $', '').trim();
  }

  async getTax() {
    const text = await this.page.locator(checkoutOverviewLocators.tax).textContent();
    return text?.replace('Tax: $', '').trim();
  }

  async getTotal() {
    const text = await this.page.locator(checkoutOverviewLocators.total).textContent();
    return text?.replace('Total: $', '').trim();
  }

  async clickCancel() {
    await this.page.locator(checkoutOverviewLocators.cancelButton).click();
  }

  async clickOnFinish() {
    await this.page.locator(checkoutOverviewLocators.finishButton).click();
  }
}
