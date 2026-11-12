import {test,expect} from"@playwright/test";
import { LoginPom }  from "../Pages/LoginPom.page";
import fs from 'fs' // file system qui nous permet de lire le fichier csv 
import { parse } from "csv-parse/sync" // importer un parseur pour convertir le fichier csv en objet js
import  path  from "path" // la chemin d'emplacement 

let lp : LoginPom

const users = parse(fs.readFileSync(path.join(__dirname,"data/jdd.csv")),{
    columns: true, //l'entete de fichier csv 
    skip_empty_lines:true,
})

test("loginjdd",async({page})=>{
  lp = new LoginPom(page)
  for (const user of users){
    await page.goto("https://www.saucedemo.com/")
    /*await lp.setUsername(user!.username)// ! le non null assertion operator 
    await lp.setPassword(user!.password)
    await lp.clickButton()*/
    await lp.LoginToApp(user!.username,user!.password)

  if(user!.resultat =="passed"){
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  }else{
    await expect(lp.getErrorMessage()).toBeVisible()

    // si on veux la faire avec la methode de visibilité 
    //await expect(lp.visibiliteOfmessage()).toBe (true)
}

  }

})
