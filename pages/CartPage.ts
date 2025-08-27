import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartList: Locator;
    readonly checkoutButton: Locator;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartList = page.locator('[data-test="cart-list"]');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
    }

    // Actions
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    // Assertions
    async expectToBeOnCartPage() {
        await expect(this.cartList).toBeVisible();
    }

    async expectItemCount(count: number) {
        await expect(this.inventoryItems).toHaveCount(count);
    }
}