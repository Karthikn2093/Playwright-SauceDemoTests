import { test, expect } from '@playwright/test'
test.describe('Peloton', () => {
    test('First Test', async ({ page }) => {

        await page.goto('https://www.onepeloton.com/');
        await page.click('#onetrust-accept-btn-handler');
        await page.getByRole('button', { name: "Update Preferences" }).click();
        await page.locator('[data-test-id="account"]').click();
        await page.getByText('Sign In').click();
        await page.locator('#usernameOrEmail').fill('tier08021');
        await page.locator('#password').fill('11111111');
        await page.getByRole('button', { name: 'Log in' }).first().click();
        await page.locator('[data-test-id="nav.disciplineClasses"]').getByText('Classes').click();
        const exploreButton = page.locator('a[data-test-id="product-details-primary-cta"]', { hasText: 'Explore' });

        // Ensure it's visible before clicking
        await exploreButton.first().waitFor({ state: 'visible' });
        await exploreButton.first().click();

        await page.waitForTimeout(2000);
        const closeButton = page.locator('[data-test-id="dismissModal"]');
        if (await closeButton.isVisible().catch(() => false)) {
            await closeButton.click();
        }
        await page.getByRole('button', { name: 'Browse classes' }).click();

        const thumbNails = page.locator('//div[@role="group"]');
        for(let i = 0; i < 2; i++){
            const labelLocator = thumbNails.nth(i).locator('[data-test-id="videoCellClassLabel"]');
            const label = await labelLocator.textContent();
            expect(label).toContain('Free');
        }
    })
})