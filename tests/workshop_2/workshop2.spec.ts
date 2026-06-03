import {test, expect } from '@playwright/test';

test('Automating Form Submissions', async ({page}) => {
await page.goto('https://demo.playwright.dev/todomvc');
const todoInput = page.getByPlaceholder('What needs to be done?');
await todoInput.fill('Buy groceries');
await todoInput.press('Enter');
await todoInput.fill('Walk the dog');
await todoInput.press('Enter');
await page.waitForTimeout(3000);

const firstTodo = page.getByTestId('todo-item').nth(0);
const secondTodo = page.getByTestId('todo-item').nth(1);
await firstTodo.getByRole('checkbox').check();

await expect(firstTodo).toHaveClass(/completed/);
await expect(secondTodo).not.toHaveClass(/completed/);
});

test.only('Handling Forms', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    const placeholder = '[placeholder="What needs to be done?"]';
    await page.fill(placeholder, 'Learn Playwright');
    await page.press(placeholder, 'Enter');

    const checkbox = await page.locator('.toggle');
    await checkbox.check();
    await page.waitForTimeout(3000);


});
