import {test,expect} from"@playwright/test";

//pour crée un test 
test("myFirstTest", async function({page}){
    //goto c'est pour acceder a quelque chose par exemple le lien 
    // await et async c'est pour la syncronisation
    await page.goto("https://www.saucedemo.com/")
});

// utiliser la fonction fleché 
test("mon 2eme test", async ({page})=>{
    await page.goto("https://www.saucedemo.com/")
});


