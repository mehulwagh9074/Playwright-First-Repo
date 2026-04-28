import { Page } from "@playwright/test";

export class DashboardPage{
    private page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    // Locator
    public readonly firstNameInputField: string = '#firstName';

    // Getters
    getFirstNameInputField () {
        return this.page.locator(this.firstNameInputField);
    }

}