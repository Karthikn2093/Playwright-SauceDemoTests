import { Page, Locator, expect } from '@playwright/test';

export class CheckoutComplete{
    readonly page: Page;

    readonly orderConfirmation: Locator;

    constructor(page: Page){
        this.page = page;

        this.orderConfirmation = page.locator('[data-test="complete-header"]');
    }

    async expectOrderComplete(){
        expect(this.orderConfirmation).toBeVisible();
    }

    // expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
}