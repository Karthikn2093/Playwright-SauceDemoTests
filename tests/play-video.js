const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Paste the same logic from your test here
  await page.goto('https://www.onepeloton.com/');
  // ... continue your steps

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
        await page.getByRole('button', {name: 'Browse classes'}).click();

        await page.locator('[data-test-id="classCategoryTitle"]').filter({hasText: 'Free'}).click();
        await page.locator('[data-test-id="videoCell"]').first().click();
        await page.locator('[data-test-id="playVideoButton"]').click();
})();