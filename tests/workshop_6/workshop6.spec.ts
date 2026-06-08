import {test, expect} from '@playwright/test';
import links from '../../fixtures/links';
  
const validUserData = {
    firstName: 'Hanna',
    lastName: 'Boyarinova',
    address: 'Anywhere 123, Batumi',
    number: '123456789'
};

test.describe.only('User registration and login flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(links.workshop6);
    });

    test('Register with valid data', async ({ page }) => {
        await page.fill('#firstName', validUserData.firstName);
        await page.fill('#lastName', validUserData.lastName);
        await page.fill('#address', validUserData.address);
        await page.fill('#number', validUserData.number);
        await page.locator('#register').click();

        const firstName = await page.locator('#displayFirstName').textContent();
        const lastName = await page.locator('#displayLastName').textContent();
        const address = await page.locator('#displayAddress').textContent();
        const number = await page.locator('#displayNumber').textContent();

        await expect(firstName).toBe(validUserData.firstName);
        await expect(lastName).toBe(validUserData.lastName);
        await expect(address).toBe(validUserData.address);
        await expect(number).toBe(validUserData.number);    
        await expect(page.getByText('Registered Data')).toBeVisible();
        await expect(page.locator('#error')).not.toBeVisible();

    });

    test('Register with all empty fields', async ({ page }) => {
        await page.locator('#register').click();
        await expect(page.locator('#error')).toBeVisible();
    });

    test('Register with some empty fields', async ({ page }) => {
        await page.fill('#firstName', validUserData.firstName);
        await page.fill('#lastName', validUserData.lastName);
        await page.locator('#register').click();
        await expect(page.locator('#error')).toBeVisible();
    });
});
