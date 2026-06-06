import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/LoginLocators';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { productsToCart } from '../test-data/products';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Page validation', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Validate Cart Page URL and UI elements', async ({ page }) => {
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const ui = cartPage.getCartPageElements();
    expect((await ui).cartTitle).toBeVisible();
    expect((await ui).shoppingCart).toBeVisible();
    expect((await ui).checkoutButton).toBeVisible();
  });

  test('Validate Continue Shopping Functionality', async ({ page }) => {
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    await cartPage.clickOnContinueShopping();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test.only('Validate First Product in the Cart Page', async ({ page }) => {
    const firstProduct = await productPage.getFirstProductDetails();
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();

    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts[0]).toEqual(firstProduct);
  });

  test('Validate all products added to the Cart Page', async ({ page }) => {});

  test('Validate Specific Products added to the Cart Page', async ({ page }) => {});

  test('Validate Remove Product Functionality', async ({ page }) => {});
});
