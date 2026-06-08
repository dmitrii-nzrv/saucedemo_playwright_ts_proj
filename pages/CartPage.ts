import { Page } from '@playwright/test';
import { cartPageLocators } from '../locators/CartPageLocators';

export class CartPage {
  constructor(private page: Page) {}

  async clickOnContinueShopping() {
    await this.page.locator(cartPageLocators.continueShoppingButton).click();
  }

  async getCartPageElements() {
    return {
      cartTitle: this.page.locator(cartPageLocators.cartTitle),
      shoppingCart: this.page.locator(cartPageLocators.continueShoppingButton),
      checkoutButton: this.page.locator(cartPageLocators.checkoutButton),
    };
  }

  async getCartProducts() {
    const allNames = await this.page.locator(cartPageLocators.productNames).allTextContents();
    const allDescriptions = await this.page.locator(cartPageLocators.productDesc).allTextContents();
    const allPrices = await this.page.locator(cartPageLocators.productPrices).allTextContents();

    const allProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescriptions[i].trim(),
      price: allPrices[i].trim(),
    }));
    return allProducts;
  }
  async removeFirstProduct() {
    await this.page.locator(cartPageLocators.removeButton).first().click();
  }
}
