import { test, expect } from '@playwright/test';
import links from '../../fixtures/links';

test('Handling Alerts', async ({page}) => {
    let message: string | undefined;
    await page.goto(links.workshop4);
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        message = await dialog.message();
        await page.waitForTimeout(3000);
        await dialog.accept();
    });

    await page.click('#show-alert');
    await page.waitForTimeout(3000);
    expect(message).toBe('This is a simple alert.');
});

test('Confirm Alerts', async ({page}) => {
    let message: string | undefined;
    await page.goto(links.workshop4);
    page.on('dialog', async dialog => {
   message = await dialog.message();
   await dialog.dismiss();
    });

    await page.click('#show-confirm');
    await page.waitForTimeout(3000);
    expect(message).toBe('You clicked Cancel.');


});

test.only('Handling Pop-ups', async ({page}) => {
    await page.goto(links.workshop4);
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('#open-popup')
    ]);
    await popup.waitForLoadState();
    expect(popup.url()).toBe('https://example.com/');
    await popup.close();
});
