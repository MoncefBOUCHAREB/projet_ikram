import {test as base,expect,Page} from "@playwright/test" 

//chaqu'un des deux test la utilise leur propre page 
type Fixtures = {
    loggedPage: Page;
    invalideLoggedPage: Page;
}
export const test = base.extend<Fixtures>({
    loggedPage: async({page},use)=>{
        await page.goto("https://www.saucedemo.com/")
        await page.locator("#user-name").fill("standard_user")
        await page.locator("#password").fill("secret_sauce")
        await page.locator("#login-button").click()
        await use (page)

    },
        invalideLoggedPage: async({page},use)=>{
        await page.goto("https://www.saucedemo.com/")
        await page.locator("#user-name").fill("invalide_standard_user")
        await page.locator("#password").fill("secret_sauce")
        await page.locator("#login-button").click()
        await use (page)

    },
    
})

export{expect}