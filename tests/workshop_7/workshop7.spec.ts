import {test, expect} from '@playwright/test';
import links from '../../fixtures/links';
const selectors = {
        firstName : '#firstName',
        age: '#age',
        student: '#isStudent'
    };

test.describe('Variables Declaration and Types', ()=>{
    test('Declarations and Types', async ({page})=>{
        let addFirstName: string = 'John';
        let addAge: number = 10;
        let student: boolean = false;

        await page.goto(links.workshop7);
        await page.fill(selectors.firstName, addFirstName);
        await page.fill(selectors.age, addAge.toString());
        await page.check(selectors.student);
        await page.click('#applyData');

        await expect(await page.textContent('#displayFirstName')).toBe(addFirstName);
        await expect(await page.textContent('#displayAge')).toContain(addAge.toString());
        await expect(await page.textContent('#displayIsStudent')).toContain('Yes');
        await expect(await page.isChecked(selectors.student));
    });
});

test.describe.only('Type Definitions and Interfaces', ()=>{
    type User = {
            firstName: string,
            age: number,
            isStudent: boolean,
        };
    let user: User = {
        firstName: 'Mike',
        age: 13,
        isStudent: false,
        }
    test('Type Definitions and Interfaces', async ({page})=>{
        await page.goto(links.workshop7);
        await page.fill(selectors.firstName, user.firstName);
        await page.fill(selectors.age, user.age.toString());
        await page.click('#applyData');

        await expect(await page.textContent('#displayFirstName')).toBe(user.firstName);
        await expect(await page.textContent('#displayAge')).toContain(user.age.toString());
        await expect(await page.textContent('#displayIsStudent')).toContain('No');
        await expect(await page.isChecked(selectors.student)).toBe(false);

    });
});
