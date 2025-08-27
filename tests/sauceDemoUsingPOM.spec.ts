import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformation } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutComplete } from '../pages/CheckoutCompletePage';
import {test} from '@playwright/test'
import { ProductDetailPage } from '../pages/ProductDetailPage';

test.describe('Sauce Demo E2E Tests',() => {

    test.beforeEach('Open URL', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
});

test('should complete full checkout flow successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInformation(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutComplete(page);

    await loginPage.goto();
    await loginPage.loginWithValidCredentials();
    await inventoryPage.expectToBeOnInventoryPage();

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    await cartPage.expectToBeOnCartPage();
    await cartPage.proceedToCheckout();

    await checkoutInfoPage.fillCheckoutInformation();
    await checkoutInfoPage.continueToOverview();
    await checkoutOverviewPage.expectToBeOnOverviewPage();
    await checkoutOverviewPage.finishOrder();

    await checkoutCompletePage.expectOrderComplete();
})

test('should display correct product price on detail page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await loginPage.loginWithValidCredentials();
    await inventoryPage.expectToBeOnInventoryPage();
    
    await inventoryPage.clickProductTitle('backpack');
    await productDetailPage.expectToBeOnProductDetailPage();
    await productDetailPage.expectPrice('$29.99');
  });

  test('should display error message for invalid login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginToApp('invalid_user', 'wrong_password');
    await loginPage.expectErrorMessage('Username and password do not match');
    await loginPage.expectToBeOnLoginPage();
  });

  test('should add multiple products to cart and verify cart count', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.loginWithValidCredentials();
    await inventoryPage.expectToBeOnInventoryPage();
    
    await inventoryPage.addMultipleItemsToCart();
    await inventoryPage.expectCartBadgeCount('3');
    
    await inventoryPage.goToCart();
    await cartPage.expectToBeOnCartPage();
    await cartPage.expectItemCount(3);
  });

});
