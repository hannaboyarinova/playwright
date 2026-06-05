import { test, expect } from '@playwright/test';

test('workshop 3', async ({ page }) => {
    await page.goto('file:///C:/Users/user/Documents/Playwright/tests/workshop_3/index.html');
    await page.hover('#hover-me');
await expect(page.locator('#hover-me')).toHaveText('Text Changed!');

    await page.click('#context-menu', { button: 'right' });
    await expect(page.getByText('Context Menu Appears!')).toBeVisible();

    await page.click('#double-click', { clickCount: 2 });
    await expect(page.getByAltText('Cute Cat')).toBeVisible();
    await expect(page.locator('img')).toHaveCount(1);
});

test('Drag and Drop', async ({ page }) => {
    await page.goto('file:///C:/Users/user/Documents/Playwright/tests/workshop_3/index.html');

    /* await page.dragAndDrop('.drag-source', '.drop-target');
    await expect(page.getByText('Success')).toBeVisible();
    await expect(page.locator('.drop-target')).toContainText('Success'); */
    await page.hover('.drag-source');
    await page.mouse.down();
    await page.locator('.drop-target').hover();
    await page.mouse.up();
    await expect(page.getByText('Success')).toBeVisible();
    await expect(page.locator('.drop-target')).toContainText('Success');
});

test.only('Handling iframes', async ({ page }) => {
    await page.goto('file:///C:/Users/user/Documents/Playwright/tests/workshop_3/index.html');
    
    // ИСПРАВЛЕНИЕ: Целимся непосредственно в тег iframe
    const iframeElement = page.frameLocator('iframe');
    const inputSelector = '[placeholder="Type something..."]'; // Используем надежный плейсхолдер из snapshot
    
    // Взаимодействие внутри фрейма
    await iframeElement.locator(inputSelector).fill('Hello from Playwright!');
    
    // Best Practice: используем toHaveValue вместо ручного извлечения через inputValue()
    await expect(iframeElement.locator(inputSelector)).toHaveValue('Hello from Playwright!');
});