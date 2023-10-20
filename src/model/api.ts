import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { Tache } from "./Tache";
import {Categorie} from "./Categorie";

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
}).then(async (connection) => {
  const app = express();
  app.use(bodyParser.json());

  // Create a new task
  app.post("/tache", async (req, res) => {
    const { description,titreTache,dateEcheance,idCategorie } = req.body;
    const tache = new Tache();

    const categoryRepository = getRepository(Categorie);
    const categorie = await categoryRepository.findOne({ where: { idCategorie: idCategorie } });
    if(categorie !== undefined) tache.categorie = categorie;

    if(description !== undefined) tache.description = description;
    tache.titreTache = titreTache;
    tache.dateEcheance = dateEcheance;

    await tache.save();

    return res.json(tache);
  });

  // Get all tasks
  app.get("/tache", async (req, res) => {
    const tache = await Tache.find({relations: ["categorie"]});
    return res.json(tache);
  });

  // Update task status
  app.put("/tache/:id", async (req, res) => {
    const { id } = req.params;
    const { titreTache,description,dateEcheance,idCategorie,completed } = req.body;
    const tacheRepository = getRepository(Tache)
    const tache = await tacheRepository.findOne({where: {idTache: parseInt(id)}});

    if (!tache ) {
      return res.status(404).json({ message: "tache not found" });
    }
    if(idCategorie !== undefined) {
      const categoryRepository = getRepository(Categorie);
      const nouvelleCategorie = await categoryRepository.findOne({ where: { idCategorie: idCategorie } });
      if(nouvelleCategorie !== undefined) tache.categorie = nouvelleCategorie;
    }
    if(completed !== undefined) tache.completed = completed;
    if(titreTache !== undefined)tache.titreTache = titreTache;
    if(description !== undefined)tache.description = description;
    if(dateEcheance !== undefined)tache.dateEcheance = dateEcheance;

    await tache.save();

    return res.json(tache);
  });

  // Delete a task
  app.delete("/tache/:id", async (req, res) => {
    const { id } = req.params;
    const tacheRepository = getRepository(Tache)
    const tache = await tacheRepository.findOne({where: {idTache: parseInt(id)}});

    if (!tache) {
      return res.status(404).json({ message: "Task not found" });
    }

    await tache.remove();

    return res.status(204).send();
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((error) => console.log(error));
