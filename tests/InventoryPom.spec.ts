import { expect,test } from "@playwright/test";
import { InventoryPom } from "../Pages/InventoryPom.page"
import { LoginPom } from "../Pages/LoginPom.page";

let lp : LoginPom
let Ip : InventoryPom

test.beforeEach(async({page})=>{

    await page.goto("https://www.saucedemo.com/")
    lp = new LoginPom(page)
    Ip = new InventoryPom(page)
    await lp.setUsername("standard_user")
    await lp.setPassword("secret_sauce")
    await lp.clickButton()

})

test("Ajouter produit ", {tag:'@produit'},async({page})=>{

await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
await Ip.ClickAdd()
//pour verifier juste la visibilité de 1
await expect(Ip.visibiliteOfmessage())
//verifier le num 1 sur le panier est bien afficher a 1
await expect(Ip.getnumpanier()).toHaveText("1")
await Ip.clickPanier()
await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
})















/*const btnRemove = await Ip setRemoveAfficher()
await expect*/





