//importer un test comme une base pour pouvoir le recuperer apres 
import {test as base,expect} from "@playwright/test" 

export const test = base.extend({

    page : async({page},use )=>{ 
        await page.goto("https://www.saucedemo.com/")
        await use (page) // la fixture est prete pour l'utilise dans le test 
    }
})
export {expect} 