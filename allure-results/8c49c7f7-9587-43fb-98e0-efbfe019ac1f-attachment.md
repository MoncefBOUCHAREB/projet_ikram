# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginjdd.spec.ts >> loginjdd
- Location: tests\loginjdd.spec.ts:14:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://www.saucedemo.com/inventory.html"
Received: "https://www.saucedemo.com/"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    11 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://www.saucedemo.com/"

```

```yaml
- text: Swag Labs
- main:
  - form "Login":
    - textbox "Username": user!.username
    - textbox "Password": user!.password
    - alert:
      - button "Dismiss error"
      - text: "Epic sadface: Username and password do not match any user in this service"
    - button "Login"
  - heading "Accepted usernames are:" [level=4]
  - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
  - heading "Password for all users:" [level=4]
  - text: secret_sauce
```

# Test source

```ts
  1  | import {test,expect} from"@playwright/test";
  2  | import { LoginPom }  from "../Pages/LoginPom.page";
  3  | import fs from 'fs' // file system qui nous permet de lire le fichier csv 
  4  | import { parse } from "csv-parse/sync" // importer un parseur pour convertir le fichier csv en objet js
  5  | import  path  from "path" // la chemin d'emplacement 
  6  | 
  7  | let lp : LoginPom
  8  | 
  9  | const users = parse(fs.readFileSync(path.join(__dirname,"data/jdd.csv")),{
  10 |     columns: true, //l'entete de fichier csv 
  11 |     skip_empty_lines:true,
  12 | })
  13 | 
  14 | test("loginjdd",async({page})=>{
  15 |   lp = new LoginPom(page)
  16 |   for (const user of users){
  17 |     await page.goto("https://www.saucedemo.com/")
  18 |     /*await lp.setUsername(user!.username)// ! le non null assertion operator 
  19 |     await lp.setPassword(user!.password)
  20 |     await lp.clickButton()*/
  21 |     await lp.LoginToApp("user!.username","user!.password")
  22 | 
  23 |   if(user!.resultat=="passed"){
> 24 |     await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  25 |   }else{
  26 |     await expect(lp.getErrorMessage()).toBeVisible()
  27 | 
  28 |     // si on veux la faire avec la methode de visibilité 
  29 |     //await expect(lp.visibiliteOfmessage()).toBe (true)
  30 | }
  31 | 
  32 |   }
  33 | 
  34 | })
  35 | 
```