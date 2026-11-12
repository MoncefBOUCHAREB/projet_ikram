                                    =====Un framework===== 
c’est une base avec une structure et des outils déjà prêts, sur laquelle on construit son propre code.
écrire un test,
le lancer,
vérifier le résultat (est-ce que j’obtiens bien ce que j’attends ?),
afficher un rapport (ce qui a réussi, ce qui a échoué).

                          =====Playwright permet le cross-browser=====
 on peut lancer les mêmes tests sur Chromium, Firefox et WebKit (Safari). Pas besoin d’installer ces navigateurs soi-même, Playwright les télécharge automatiquement.

                                =====Architecture du playwright=====

Bloc 1 – Code
   VS Code + TypeScript : on écrit les tests
        +
Bloc 2 – Outil d'automatisation
   Playwright : exécute les actions du test
        ▼
Bloc 3 – Page
   L'instance "page" : un onglet du navigateur où Playwright agit.
   Sans page, Playwright ne peut rien faire sur l'application.
        ▼
Bloc 4 – Navigateur
   Le navigateur où le test s'exécute :
   Chrome → Chromium
   Firefox → Firefox
   Safari → WebKit
        ▼
Bloc 5 – Application
   L'application s'affiche et est testée dans le navigateur


                        =====Une extension===== 
c’est un module qu’on ajoute à Vscode pour lui donner de nouvelles fonctions.

=====Un profil VS Code===== un ensemble d’extensions et de réglages pour un framework donné.Pour avoir un environnement dédié au projet de test, avec uniquement les extensions et réglages nécessaires. Ça évite les conflits avec les autres projets, ça garde VS Code léger,

=====L’auto-waiting===== c’est quand Playwright attend tout seul qu’un élément soit prêt (affiché et cliquable) avant d’agir dessus. Par exemple, après le login, il attend que la page des produits soit chargée avant de cliquer sur “Ajouter au panier”. On n’a donc pas besoin d’écrire des temps d’attente dans le code, et les tests sont plus fiables.

=====Une page===== c’est un onglet dans le navigateur.

=====Un locator===== c’est un objet qui permet de cibler un élément sur ma page web pour agir dessus (cliquer, remplir, vérifier).

=====Les Locators d'accessibilités===== sont des sélecteurs qui identifient les éléments d’une page à partir de leurs role
exemple : 
await page.getByRole("textbox", { name: "Username" }).fill("locked_out_user")

=====comment utiliser les locators===== :
Locators d’accessibilité Playwright (getByRole, getByLabel, getByText) : ils trouvent l’élément comme un utilisateur le voit.

Attributs de test (data-test, data-testid) : très robustes. S’ils n’existent pas, je demande aux devs de les ajouter.

Locators CSS : par id, class, name ou type.

XPath (naviguer dans l’arborescence du DOM) : dernier choix, car peu robuste. Si la structure de la page change, le locator casse.

=====comment cibler les locators=====
await.page.locator("#ID") il est toujour uique il est robuste 
await.page.locator"[data_test='']" 
await.page.locator"[name='']" 
await.page.getbyplaceholder"()"
await.page.class". " 

                                    =====les tests flaky=====
Un test flaky c’est un test instable qui passe parfois et échoue parfois, alors qu’on n’a rien modifié : ni le code du test, ni l’application.

                                        =====Les Hooks=====
Les hooks sont des fonctions de Playwright qui s’exécutent automatiquement avant ou après chaque test.

beforeEach regroupe les étapes qui se répètent au début de chaque test, comme le login. On l’écrit une seule fois au lieu de la réécrire dans chaque test.
afterEach s’exécute après chaque test pour nettoyer l’environnement (vider le panier, se déconnecter…).

=                                         ====modes=====
mode headless lancer le test sans interface graphique tests au terminal et tu vois juste les tests passed et les test echoué avec les logs 
mode headed lancer le test avec interface graphique 

=====les tags===== {tag:"@TNR","@smoke"}
Les TAGS c'est des mecanisme qui permet de classifier les tests sans toucher la logique metier et ciblé exactement les tests on souhaite executer

TNR veut dire Tests de Non-Régression. Ils vérifient que les nouvelles modifications n’ont rien cassé de ce qui marchait déjà.

smoke : un petit ensemble de tests rapides qui vérifient que les fonctions principales de l’application marchent, avant de lancer tous les autres tests.

=====le POM=====
POM (Page Object Model) est un design pattern qui consiste à créer une classe pour chaque page web. Cette classe contient les locators et les actions de la page.il permet de separer la logique metier et la logique des tests 

Par exemple, imaginons que j’ai 10 tests qui commencent tous par le login. Sans POM, je dois écrire les locators du champ username, du champ password et du bouton login dans chacun des 10 tests. Si un jour le développeur change l’identifiant du bouton login, les 10 tests cassent, et je dois corriger le locator dans 10 fichiers différents. Avec le POM, je crée une classe LoginPage qui contient les locators et les actions de la page de login, et mes 10 tests utilisent simplement cette classe. Si le bouton change, je modifie une seule ligne dans la classe, et tous les tests remarchent. Le POM évite donc de répéter le code et rend la maintenance beaucoup plus simple.

                                        =====La DDT=====
DDT (Data Driven Testing) est une approche de test qui consiste à exécuter le même scénario plusieurs fois avec différents jeux de données (JDD), pour vérifier le comportement de l’application dans plusieurs cas.

                                 =====Pourquoi utiliser le DDT ?=====

Éviter la duplication : on écrit le scénario une seule fois.
Améliorer la couverture des tests : on teste plusieurs cas (nominal, échec, champs vides, utilisateur bloqué…) pour vérifier le comportement de l’application dans chaque situation.
Faciliter la maintenance : pour ajouter un cas, on ajoute juste une ligne de données, sans toucher au code du test.

=====D’où viennent les jeux de données (JDD) ?=====

1/ La base de données (BDD) : on récupère des données réelles avec des requêtes SQL.
2/ Swagger : c’est un outil qui permet de documenter, visualiser et tester les API. Il montre les champs attendus et des exemples de données, ce qui aide à construire les JDD.

Endpoint : l’URL qui correspond à la fonction de l’API qu’on veut tester (par exemple POST /api/login).
Payload : le corps de la requête, c’est-à-dire les données envoyées avec POST, PUT ou PATCH.

3/ L’expertise du testeur : le testeur crée lui-même les JDD à partir de sa connaissance de l’application et des règles métier (cas nominaux, cas d’erreur, champs vides, cas limites…). Il collabore avec les membres de l’équipe (développeurs, PO, métier) pour les valider.

=====Fixtures=====
Fixtures : ce sont des objets prêts à l’emploi que Playwright injecte automatiquement dans les tests (par exemple page). Elles jouent le même rôle que le beforeEach : préparer les tests avant leur exécution. On a donc le choix entre les deux.

=====Pourquoi les utiliser ?=====
Améliorer la qualité du code et éviter la duplication.
Rendre les tests maintenables et réutilisables.
Isoler les tests : chaque test a sa propre page, il est donc indépendant. Si un test échoue, il n’affecte pas les autres.

=====BDD=====
On passe au BDD pour que les personnes non techniques (PO, métier) puissent lire et comprendre les tests.
Cucumber est un outil qui permet d’appliquer l’approche BDD : il relie chaque phrase du fichier .feature (écrite en Gherkin) au code technique écrit par le testeur (les step definitions).

gherkin : decrire  le senario en gherkin 
cocumber le comprendre et le traduire en codetech (.steps)
playwright : l'executer les actions sur le navigateur 