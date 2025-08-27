import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutInformation {
  readonly page: Page;
  
  // Checkout Information Step
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly zipCodeField: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Information step elements
    this.firstNameField = page.getByRole("textbox", {name: 'First Name'});
    this.lastNameField = page.getByRole("textbox", {name: 'Last Name'});
    this.zipCodeField = page.getByRole("textbox", {name: 'Zip/Postal Code'});
    this.continueButton = page.getByRole('button', {name: 'Continue'});
  }

  // Actions - Information Step
  async fillCheckoutInformation() {
    await this.firstNameField.fill(faker.person.firstName());
    await this.lastNameField.fill(faker.person.lastName());
    await this.zipCodeField.fill(faker.location.zipCode());
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

}