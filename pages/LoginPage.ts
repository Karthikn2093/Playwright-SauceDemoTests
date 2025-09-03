import { Page, Locator, expect } from '@playwright/test';
import { EnvironmentManager } from '../config/environmentManager';

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
        const credentials = EnvironmentManager.getValidCredentials();
        console.log(`Logging in with valid credentials for ${EnvironmentManager.getEnvironment().name} environment`);
        await this.loginToApp(credentials.username, credentials.password);
    }

    async loginWithInvalidCredentials() {
        const credentials = EnvironmentManager.getInvalidCredentials();
        console.log(`Logging in with invalid credentials for ${EnvironmentManager.getEnvironment().name} environment`);
        await this.loginToApp(credentials.username, credentials.password);
    }
    async expectErrorMessage(message: string) {
        const timeout = EnvironmentManager.getTimeouts().default;
        await expect(this.errorMessage).toBeVisible({ timeout });
        await expect(this.errorMessage).toContainText(message);
    }

    async expectToBeOnLoginPage() {
        const baseUrl = EnvironmentManager.getBaseUrl();
        await expect(this.page).toHaveURL(new RegExp(`${baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`));
    }

}