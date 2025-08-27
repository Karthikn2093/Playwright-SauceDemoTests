import {test, expect} from '@playwright/test'
import { faker } from '@faker-js/faker';

//Test data
const login_credentials = {
  username: 'standard_user',
  password: 'secret_sauce'
}

async function loginToApp(page){
  await page.getByRole("textbox", {name: 'Username'}).fill(login_credentials.username);
  await page.getByRole("textbox", {name: 'Password'}).fill(login_credentials.password);
  await page.getByRole('button', {name: 'Login'}).click();
}

test.describe('Saucedemo E2E Tests', () => {

test.beforeEach('Open URL', async({page}) => {
    await page.goto("https://www.saucedemo.com");
});

test('should display error message for invalid login credentials', async ({ page }) => {
  await page.getByRole("textbox", {name: 'Username'}).fill('invalid_user');
  await page.getByRole("textbox", {name: 'Password'}).fill('wrong_password');
  await page.getByRole('button', {name: 'Login'}).click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

test("Saucedemo checkout overview loads after filling form", async ({ page }) => {
  //Login
  await loginToApp(page);

  //Verify Inventory page
  await expect(page.url()).toContain('inventory');

  //Add product to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  //Go to cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  //Verify Cart page
  await expect(page.url()).toContain('cart');

  //Go to checkout
  await page.getByRole('button', {name: 'Checkout'}).click();

  //Fill form
    await page.getByRole("textbox", {name: 'First Name'}).fill(faker.person.firstName());
    await page.getByRole("textbox", {name: 'Last Name'}).fill(faker.person.lastName());
    await page.getByRole("textbox", {name: 'Zip/Postal Code'}).fill(faker.location.zipCode());
    await page.getByRole('button', {name: 'Continue'}).click();

    //Verify checkout overview page
    expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await page.getByRole('button', {name: 'Finish'}).click();

    //Verify order confirmation
    expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('Add multiple products to cart', async({page}) => {
  //Login
  await loginToApp(page);

  //Verify Inventory page
  await expect(page.url()).toContain('inventory');

  // Add first product (Backpack)
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  // Add second product (Bike Light)  
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  
  // Add third product (Bolt T-Shirt)
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

  // Verify cart badge shows correct count
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

  //Go to cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  //Verify Cart page
  await expect(page.url()).toContain('cart');

  //verify all items are present
  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(3);
})

test("Verify the price", async ({ page }) => {
  
  //Login
  await loginToApp(page);

  // Click on Sauce Labs Backpack
  await page.locator('[data-test="item-4-title-link"]').click();

  // Assert price is $29.99
  const price = await page.locator('[data-test="inventory-item-price"]').textContent();
  expect(price).toBe('$29.99');

})
});
