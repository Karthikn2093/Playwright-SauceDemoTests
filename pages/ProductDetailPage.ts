import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {

    readonly page: Page;
    readonly inventoryItem: Locator;
    readonly price: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItem = page.locator('[data-test="inventory-item"]');
        this.price = page.locator('[data-test="inventory-item-price"]');
    }

    async expectToBeOnProductDetailPage(){
        await expect(this.inventoryItem).toBeVisible();
    }

    async expectPrice(expectedPrice: string){
        const priceText = await this.price.textContent();
        expect(priceText).toBe(expectedPrice);
    }

}