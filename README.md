
# todolist - ArchiLogiciel

Initialisé le projet :

```
npm i
```

Adapter le base de données au besoin dans le api.js :
```
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "todolist",
  synchronize: true,
  logging: true,
  entities: [Tache,Categorie],
})
```
Puis build l'api avec :
```
tsc
```
Suite a cela, lancer l'api dans un terminal avec :
```
node dist/model/api.js
```
Dans un terminal à part, lancer le front :
```
npm run dev
```
Et voilà :)