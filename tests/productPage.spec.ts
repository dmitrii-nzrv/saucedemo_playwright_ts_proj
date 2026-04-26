import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/LoginLocators';
import { ProductPageLocators } from '../locators/ProductPageLocators';

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
});
