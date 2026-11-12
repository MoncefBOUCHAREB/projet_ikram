import {test,expect} from "../fixtures/test_pomprobase"

test("login valide",async ({LoginPomValide})=>{
    await expect(LoginPomValide.page).toHaveURL("https://www.saucedemo.com/inventory.html")
})

test("login invalide",async ({InvalidePom})=>{
    await expect(InvalidePom.page.getByRole("alert")).toBeVisible()
})