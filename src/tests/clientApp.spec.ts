import { test, expect } from '@playwright/test'


test('Login automation', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    console.log(expect(page).toHaveTitle);
    await page.pause();
    await page.locator('.btn1').click();
    await page.locator('#firstName').fill('Manav');
    await page.locator('#lastName').fill('Playwright');
    await page.locator('#userEmail').fill('manavplaywright@mailinator.com');
    await page.locator('#userMobile').fill('9874563210');
    await page.locator("select[formcontrolname='occupation']").selectOption("Engineer");
    await page.locator('input[value="Male"]').check();
    await page.locator('#userPassword').fill('Aa12345678');
    await page.locator('#confirmPassword').fill('Aa12345678');
    await page.locator('input[formcontrolname="required"]').check();
    await page.locator('#login').click();
}
)

test('Cart selection', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    console.log(await page.title());
    await page.locator('#userEmail').fill('manavplaywright@mailinator.com');
    await page.locator('#userPassword').fill('Aa12345678');
    await page.locator('#login').click();
    await page.locator('.card-body b').nth(0).waitFor();
    const allTitles = await page.locator('.card-body b').allTextContents();
    console.log(allTitles);
})


test.only('ClientApp E2Eworkflow Section 6 and video 28', async ({ page }) => {

    // ===== CONSTANTS =====
    const url = 'https://rahulshettyacademy.com/client/#/auth/login';
    const emailId = 'manavplaywright@mailinator.com';
    const password = 'Aa12345678';
    const productName = 'ZARA COAT 3';
    const country = 'India';
    const couponCode = 'rahulshettyacademy';

    // ===== LOGIN =====
    await page.goto(url);
    console.log(await page.title());

    await page.locator('#userEmail').fill(emailId);
    await page.locator('#userPassword').fill(password);
    await page.locator('#login').click();

    // ===== ADD PRODUCT =====
    const product = page.locator('.card-body').filter({ hasText: productName });
    await product.getByRole('button', { name: "Add To Cart" }).click();

    await page.getByRole("button", { name: 'Cart 1' }).click();

    await page.getByRole("button", { name: 'Checkout' }).click();

    // ===== CHECKOUT =====
    await page.getByRole("textbox", { name: "Select Country" }).pressSequentially(country);

    await page.getByText(country, { exact: true }).click();

    await page.locator("//div[@class='payment__cc']//div[2]//input[1]").fill('123');
    await page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]").fill('Mehul Wagh');

    await page.locator("//input[@name='coupon']").fill(couponCode);
    await page.locator("//button[normalize-space()='Apply Coupon']").click();

    await expect(
        page.locator("//p[contains(text(),'Coupon Applied')]")
    ).toBeVisible();

    await page.locator("//a[normalize-space()='Place Order']").click();

    // ===== ORDER VERIFICATION =====
    await expect(page.getByText(productName, { exact: true })).toHaveText(productName);
    const orderIdValue = (await page.locator("//td[label[contains(text(),'|')]]/label").textContent())!.replace(/\|/g, '').trim();

    await page.getByText('Orders History Page', { exact: true }).click();

    const orderId = page.getByText(orderIdValue);

    await expect(orderId).toBeVisible();

    await orderId.locator("xpath=ancestor::tr//button[normalize-space()='View']").click();
});