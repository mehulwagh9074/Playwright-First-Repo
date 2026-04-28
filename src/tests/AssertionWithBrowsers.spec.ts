import { test, expect } from '@playwright/test';

test('Browser context playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('input#username');
    const passWord = page.locator('[type=password]');
    const signIN = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a');
    const userradio = page.locator('.radiotextsty').nth(1);
    const checkbox = page.locator('#terms');
    const documentLink = page.locator('.blinkingText').nth(0);
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill('MehulWagh');
    await page.locator('[type=password]').fill('learning');
    await page.locator('select.form-control').selectOption('Teacher')
    await userradio.check();                   //check the radio button
    await expect(userradio).toBeChecked();     //verifies/asserts if the radio button is checked or not
    await page.locator('#okayBtn').click();
    await checkbox.check();
    await expect(checkbox).toBeChecked(); //verifies if the checkbox is checked or not
    await checkbox.uncheck(); //unchecks the checkbox
    //await expect(checkbox.isChecked()).toBeFalsy(); // Verify that the checkbox is NOT checked (False) before performing any action
    await expect(checkbox).not.toBeChecked(); // Ensures the checkbox is currently unchecked
    await expect(documentLink).toHaveAttribute("class", "blinkingText"); //It clarifies that you are verifying the "Blinking" property is active on that element.
    await signIN.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    //type - fill
    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning@830$3mK2");
    await signIN.click();
    console.log(await cardTitles.nth(1).textContent()); // will check second element out of the 4 matched
    console.log(await cardTitles.first().textContent()); // will check first element out of the 4 matched
    console.log(await cardTitles.allTextContents());
});

test.only('child window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('.blinkingText').nth(0);
    const [newPage] = await Promise.all([context.waitForEvent('page'), documentLink.click()])
    //await expect(newPage.locator('.red')).toHaveText('Please email us at mentor@rahulshettyacademy.com with below template to receive response')
    console.log(await newPage.locator('.red').textContent());
    const emailID = await newPage.locator('a[href*="mailto"]').textContent() || "";
    const userName = page.locator('input#username');
    await page.pause();
    await userName.fill(emailID);
    console.log(await page.locator('input#username').inputValue())
})