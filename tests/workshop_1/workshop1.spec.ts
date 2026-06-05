import {test} from '@playwright/test';

test('Basic navigation', async ({page}) => {
    await page.goto('http://playwright.dev/docs/writing-tests');
    await page.waitForTimeout(3000);
    await page.reload();

});

test('Interacting with elements', async ({page}) => {
    await page.goto('https://about.gitlab.com/');
    await page.waitForTimeout(3000);
    await page.click("#onetrust-accept-btn-handler");
    await page.getByRole('link', {name: 'Get free trial'}).click();
    await page.waitForTimeout(5000);
    await page.getByTestId('new-user-first-name-field').fill('Hanna');
    await page.getByTestId('new-user-last-name-field').fill('Boyarinova');



/* 
    await page.getByRole("link", {name: 'actionability'}).click();
    await page.waitForTimeout(5000); */
});

test('using Various Selectors', async ({page}) => {
     await page.goto('https://about.gitlab.com/');
     await page.click("#onetrust-accept-btn-handler"); //cookie banner
     await page.getByRole('menuitem', { name: 'Platform' }).hover();
     await page.locator('a.navigation-dropdown-cards__card[data-ga-name="platform"]').click();
    await page.click(':has-text("View pricing")');});
