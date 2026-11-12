import {Page} from "@playwright/test"

export class LoginPom{
// Le P majuscule Page c'est le type de page
    readonly page : Page;
//le constructor inisialisé les attributs 
    constructor( p : Page){
        this.page = p;
    }

//definir les locators de la page login
elements={
username :    ()=>this.page.locator("#user-name"),
password :    ()=>this.page.locator("#password"),
loginButton:  ()=>this.page.locator("#login-button"),
messageError: ()=>this.page.locator("[data-test='error']"),
}
//definir les methodes associé aux locators
async setUsername(u:string){
await this.elements.username().fill(u)
}

async setPassword(p:string){
await this.elements.password().fill(p)
}

async clickButton(){
await this.elements.loginButton().click()
}

// avec la promise vas retourner un message 
async getErrorMessageText():Promise<string|null>{
    return await this.elements.messageError().textContent()
}


//pour la faire simplement la verif de message sans async on fais comme ca 
// vas retourner un locator 
getErrorMessage(){
return this.elements.messageError()
}

async visibiliteOfmessage(){

    await this.elements.messageError().isVisible()
}



async LoginToApp(u:string,p:string){
      await this.setUsername(u)
      await this.setPassword(p)
      await this.clickButton()
}
}