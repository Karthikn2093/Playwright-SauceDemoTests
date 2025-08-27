import { Page, Locator, expect } from '@playwright/test';
export class InventoryPage {

    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;

    // Product locators
    readonly backpackAddButton: Locator;
    readonly bikeLightAddButton: Locator;
    readonly boltTshirtAddButton: Locator;
    readonly backpackTitleLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Main page elements
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');

        // Product elements
        this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.bikeLightAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.boltTshirtAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.backpackTitleLink = page.locator('[data-test="item-4-title-link"]');
    }

    //Actions
    async addBackpackToCart() {
        await this.backpackAddButton.click();
    }

    async addBikeLightToCart() {
        await this.bikeLightAddButton.click();
    }

    async addBoltTshirtToCart() {
        await this.boltTshirtAddButton.click();
    }

    async addMultipleItemsToCart() {
        await this.addBackpackToCart();
        await this.addBikeLightToCart();
        await this.addBoltTshirtToCart();
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }

    async clickProductTitle(productName: 'backpack') {
        switch (productName) {
            case 'backpack':
                await this.backpackTitleLink.click();
                break;
            // Can add more products later
        }
    }

    // Assertions
    async expectToBeOnInventoryPage() {
        await expect(this.page).toHaveURL(/.*inventory.html/);
        await expect(this.inventoryContainer).toBeVisible();
    }

    async expectCartBadgeCount(count: string) {
        await expect(this.shoppingCartBadge).toHaveText(count);
    }
}