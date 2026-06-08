import { test, expect } from '@playwright/test';
import links from '../../fixtures/links';

test('Open new window and navigate back', async ({ page, context }) => {
    await page.goto(links.workshop5_1);
    const pagePromise = context.waitForEvent('page');
    await page.click('#openNewWindow');
    
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    console.log(await newPage.title());
    await expect(newPage.getByAltText('cat')).toBeVisible();
    await expect(newPage.getByRole('heading', { name: 'Welcome to the New Page' })).toBeVisible();
})

test('Add cookies and verify', async ({ page }) => {
    await page.goto(links.workshop5_1);
    await page.click('#setCookie');
    const cookies = await page.context().cookies(links.workshop5_1);
    const sessionCookie = cookies.find(cookie => cookie.name === 'session');
    console.log(sessionCookie);
    await expect(sessionCookie).toBeDefined();
    await expect(sessionCookie?.value).toBe('12345');
});

test('Delete cookies and verify', async ({ page }) => {
    await page.goto(links.workshop5_1);

    await page.click('#setCookie');
    const cookies = await page.context().cookies(links.workshop5_1);
    const sessionCookie = cookies.find(cookie => cookie.name === 'session');
    console.log('Before deletion:', sessionCookie);
   
    await page.click('#deleteCookie');
    const updatedCookies = await page.context().cookies(links.workshop5_1);
    const deletedSessionCookie = updatedCookies.find(cookie => cookie.name === 'session');
    console.log('After deletion:', deletedSessionCookie);
    
    await expect(sessionCookie).toBeUndefined();
});