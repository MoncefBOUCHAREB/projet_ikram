import {test as base, expect, Page} from "@playwright/test"
import {LoginPom} from "../Pages/LoginPom.page"

type Fixtures = {
    HomePage : Page,
    LoginPomValide : LoginPom,
    InvalidePom : LoginPom,
}
export const test = base.extend<Fixtures>({

    HomePage : async ({page},use)=>{
        await page.goto ("https://www.saucedemo.com/")
        await use (page)
    },
    LoginPomValide : async ({HomePage},use)=>{
        const lp = new LoginPom(HomePage)
        await lp.LoginToApp("standard_user","secret_sauce")
        await use(lp)
},
    InvalidePom : async ({HomePage},use)=>{
        const lp = new LoginPom(HomePage)
        await lp.LoginToApp("standard_userrrrr","secret_sauce")
        await use(lp)
    }
})
export{expect}