import {Page} from "@playwright/test"

export class InventoryPom{
// Le P majuscule Page c'est le type de page
    readonly page : Page;
//le constructor inisialisé les attributs 
    constructor( p : Page){
        this.page = p;
    }

//definir les locators de la page inventory
elements={
Addtocart : ()=>this.page.locator("#add-to-cart-sauce-labs-backpack"),
removebtn : ()=>this.page.locator("#remove-sauce-labs-backpack"),
numpanier : ()=>this.page.locator("[data-test='shopping-cart-badge']"),
panierbtn : ()=>this.page.locator("[data-test='shopping-cart-link']"),
}

//definir les methodes associé aux locators
async ClickAdd(){
await this.elements.Addtocart().click()
}

// voir le 1 au niveau du panier est visible 
async visibiliteOfmessage(){
await this.elements.removebtn().isVisible()
}

/*async setRemoveAfficher():Promise<string|null>{
    return await this.elements.removebtn().textContent()
}*/

getnumpanier(){
return this.elements.numpanier()
}

async clickPanier(){
await this.elements.panierbtn().click()
}}
