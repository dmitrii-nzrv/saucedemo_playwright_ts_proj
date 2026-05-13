import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/LoginLocators';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { productsToCart } from '../test-data/products';
test.describe('Product Page validation', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Validate Logout functionality', async ({ page }) => {
    await productPage.logout();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
  });

  test('Validate About Page and navigate back', async ({ page }) => {
    await productPage.openAboutPage();
    await expect(page.locator(ProductPageLocators.requestDemoButton)).toBeVisible();
    await expect(page.locator(ProductPageLocators.try_it_free)).toBeVisible();
    await page.goBack();
    await expect(page.locator(ProductPageLocators.settingIcon)).toBeVisible();
  });

  test('Validate Product Page', async ({ page }) => {
    await productPage.validateAllProductsDisplayed();
    await productPage.addFirstProductToCart();
    await productPage.addAllProductsToCart();
  });

  test('Validate adding specific products to cart', async ({ page }) => {
    await productPage.addSpecificProductsToCart(productsToCart);
  });

  test('Filter by name A to Z', async () => {
    await productPage.filterByNameAtoZ();
    const names = await productPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('Filter by name Z to A', async () => {
    await productPage.filterByNameZtoA();
    const names = await productPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test.only('Filter by price Low to High', async () => {
    await productPage.filterByPriceLtoH();
    const prices = await productPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test.only('Filter by price High to Low', async () => {
    await productPage.filterByPriceHtoL();
    const prices = await productPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
