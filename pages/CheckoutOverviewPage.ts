// CheckoutOverviewPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.locator('.title');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
    }

    // Actions
    async finishOrder() {
        await this.finishButton.click();
    }

    // Assertions
    async expectToBeOnOverviewPage() {
        await expect(this.pageTitle).toHaveText('Checkout: Overview');
    }
}