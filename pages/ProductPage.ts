import { Page } from '@playwright/test';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { cartPageLocators } from '../locators/CartPageLocators';

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

  async validateAllProductsDisplayed() {
    const names = await this.page.locator(ProductPageLocators.productNames).allTextContents();
    const desc = await this.page.locator(ProductPageLocators.productDesc).allTextContents();
    const price = await this.page.locator(ProductPageLocators.productPrices).allTextContents();
    const buttonCount = await this.page.locator(ProductPageLocators.addToCartButtons).count();

    if (names.length === 0) throw new Error('No products found');

    if (
      names.length !== desc.length ||
      names.length !== price.length ||
      names.length !== buttonCount
    )
      throw new Error('Mismatch between the product details');
  }

  async addFirstProductToCart() {
    await this.page.locator(ProductPageLocators.addToCartButtons).first().click();
  }

  async addAllProductsToCart() {
    const buttons = this.page.locator(ProductPageLocators.addToCartButtons);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
    }
  }

  async addSpecificProductsToCart(productName: string[]) {
    const addProducts = this.page.locator(ProductPageLocators.productNames);
    const count = await addProducts.count();
    for (let i = 0; i < count; i++) {
      const name = await addProducts.nth(i).textContent();
      if (name && productName.includes(name.trim())) {
        await this.page.locator(ProductPageLocators.addToCartButtons).nth(i).click();
      }
    }
  }

  async filterByNameAtoZ() {
    await this.page.selectOption(ProductPageLocators.filterDropdown, 'az');
  }

  async filterByNameZtoA() {
    await this.page.selectOption(ProductPageLocators.filterDropdown, 'za');
  }

  async filterByPriceLtoH() {
    await this.page.selectOption(ProductPageLocators.filterDropdown, 'lohi');
  }

  async filterByPriceHtoL() {
    await this.page.selectOption(ProductPageLocators.filterDropdown, 'hilo');
  }

  async getProductNames() {
    return await this.page.locator(ProductPageLocators.productNames).allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page.locator(ProductPageLocators.productPrices).allTextContents();
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }

  async clickOnCartLink() {
    await this.page.locator(ProductPageLocators.cartLink).click();
  }

  async getFirstProductDetails() {
    const name = await this.page.locator(cartPageLocators.productNames).first().textContent();
    const description = await this.page.locator(cartPageLocators.productDesc).first().textContent();
    const price = await this.page.locator(cartPageLocators.productPrices).first().textContent();

    return {
      name: name?.trim(),
      description: description?.trim(),
      price: price?.trim(),
    };
  }

  async getAllProductDetails() {
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

  async getSpecificProductDetails(productName: string[]) {
    const allNames = await this.page.locator(cartPageLocators.productNames).allTextContents();
    const allDescriptions = await this.page.locator(cartPageLocators.productDesc).allTextContents();
    const allPrices = await this.page.locator(cartPageLocators.productPrices).allTextContents();

    const allCartProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescriptions[i].trim(),
      price: allPrices[i].trim(),
    }));
    return allCartProducts;
  }
}
