import {test,expect} from"@playwright/test";

test.beforeEach("setup",async({page})=>{ 
await page.goto("https://www.saucedemo.com/")
})

test.afterEach("teardown", async ({page})=>{
await page.context().clearCookies()
await page.evaluate(()=>localStorage.clear())
})   


test("login valide",{tag:["@smoke","@TNR"]},async ({page})=>{
// aller l'url de sauce demo 

//await page.goto("https://www.saucedemo.com/") fonction rep regarde ligne 3

// saisir user name //fill ca veux dire saisir, apres on met la donnée entre parenthese 
await page.locator("#user-name").fill("standard_user")

// saisir password 
await page.locator("#password").fill("secret_sauce")

//cliqué sur le botton login //.click() c'est l'action cliqué 
await page.locator("#login-button").click()

//redireger vers la page produit
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})

test("login invalide",{tag:"@TNR"} ,async ({page})=>{
// aller l'url de sauce demo 
//await page.goto("https://www.saucedemo.com/") fonction rep regarde ligne 3

// saisir user name //fill ca veux dire saisir, apres on met la donnée entre parenthese 
await page.locator("#user-name").fill("locked_out_user")

// saisir password 
await page.locator("#password").fill("secret_sauce")

//cliqué sur le botton login //.click() c'est l'action cliqué 
await page.locator("#login-button").click()

await expect(page.locator("[data-test='error']")).toBeVisible()
//await expect(page.locator("[data_test='error']")).toHaveText("Epic sadface: Username and password do not match any user in this service")
})

//locator d'accebility 
test("login invalide with accebility locator",{tag:"@TNR"} ,async ({page})=>{
// on commance toujour avec le role 
await page.getByRole("textbox", {name:"Username"}).fill("locked_out_user")
await page.getByRole("textbox", {name:"Password"}).fill("test_test")
await page.getByRole("button", {name:"Login"}).click()


//le url est invalid 
//getbyRole cibler les element html grace a le role 
await expect(page.getByRole("alert")).toBeVisible()
//await expect(page.getByRole("heading", (name:"Sorry, this user has been locked out."))).toBeVisible()
})
