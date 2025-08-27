import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    constructor(page) {
        this.page = page;
        //Locators
        this.usernameField = page.getByRole("textbox", { name: 'Username' });
        this.passwordField = page.getByRole("textbox", { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    //Actions

    //Navigate to SauceDemo
    async goto() {
        await this.page.goto("https://www.saucedemo.com");
    }

    async loginToApp(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
    async loginWithValidCredentials() {
        await this.loginToApp('standard_user', 'secret_sauce');
    }
    async expectErrorMessage(message) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(message);
    }

    async expectToBeOnLoginPage() {
        await expect(this.page).toHaveURL(/.*saucedemo.com\/?$/);
    }

}