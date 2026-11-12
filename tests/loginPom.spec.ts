import { expect,test } from "@playwright/test";
import { LoginPom } from "../Pages/LoginPom.page"

let lp : LoginPom

test.beforeEach(async({page})=>{

    await page.goto("https://www.saucedemo.com/")
    lp = new LoginPom(page)

})

test("Login Pom valide", {tag:'@pom'},async({page})=>{
/*await lp.setUsername("standard_user")
await lp.setPassword("secret_sauce")
await lp.clickButton()*/
await lp.LoginToApp("standard_user","secret_sauce")
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})

test("Login Pom invalide", {tag:"@invalid"},async({page})=>{

/*await lp.setUsername("standard_userrrrr")
await lp.setPassword("secret_sauce")
await lp.clickButton()*/
await lp.LoginToApp("standard_userrrrr","secret_sauce")

const message_obt= await lp.getErrorMessageText()
const message_att= "Epic sadface: Username and password do not match any user in this service"
// l'assertion pour retourner le message d'erreur avec la methode de promise "voir le Pom Login"
await expect(message_obt).toBe(message_att)
//await expect (lp.visibiliteOfmessage()).toBeTruthy()


//si on veux utiliser la 2eme methode de pom qui en commentaire  pour retourner un locator 
//await expect(lp.getErrorMessage()).toHaveText("message_att")

})



