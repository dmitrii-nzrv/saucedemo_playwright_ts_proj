import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/LoginLocators';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutData } from '../test-data/checkoutData';

test.describe('Cart Page validation', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
  });

  test('Validate Checkout Page UI Elements and URL', async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    const elements = await checkoutPage.getCheckoutElements();
    await expect(elements.cancel).toBeVisible();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.continue).toBeVisible();
  });

  test('Validate Cancel button Functionality', async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await checkoutPage.clickCancel();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

  test('Validate Continue button Functionality', async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillCheckoutDetails(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );
    await checkoutPage.clickOnContinue();
  });

  test.only('Validate the error when clicking the continue with no data', async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await checkoutPage.clickOnContinue();
    const error = await checkoutPage.getErrorMessage();
    expect(error?.trim()).toBe('Error: First Name is required');
  });
});
