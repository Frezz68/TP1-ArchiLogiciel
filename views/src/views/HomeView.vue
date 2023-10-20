<template>
  <div>
    <h1>Créer une nouvelle tâche</h1>
    <form @submit.prevent="addTask">
      <label for="title">Titre :</label>
      <input type="text" id="title" v-model="newTask.titreTache" required>

      <label for="description">Description :</label>
      <textarea id="description" v-model="newTask.description"></textarea>

      <label for="dueDate">Date d'échéance :</label>
      <input type="date" id="dueDate" v-model="newTask.dateEcheance" required>

      <label for="category">Catégorie :</label>
      <select id="category" v-model="newTask.idCategorie" required>
        <option v-for="option in categories" :key="option.idCategorie" :value="option.idCategorie">{{ option.libelleCategorie }}</option>
      </select>

      <button type="submit">Créer</button>
    </form>
  </div>
  <br>

  <div>
    <label for="mySelect">Sélectionnez une option :</label>
    <select id="mySelect" v-model="selectedOption" @change="tachesFiltrees">
      <option v-for="option in categories" :key="option.idCategorie" :value="option.idCategorie">{{ option.libelleCategorie }}</option>
    </select>
  </div>
  <br>
  <div>

    <table>
      <thead>
      <tr>
        <th>Titre</th>
        <th>Date d'échéance</th>
        <th>Catégorie</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in tasks" :key="index">
        <td>{{ task.titreTache }}</td>
        <td>{{ task.dateEcheance }}</td>
        <td>{{ task.categorie.libelleCategorie }}</td>
        <td>
          <button @click="deleteTask(task.idTache)">Supprimer</button>
          <button @click="editTask(task, categories)">Modifier</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: {
        titreTache: '',
        description: '',
        dateEcheance: '',
        idCategorie: null,
      },
      categories: [],
      selectedOption: null
    };
  },
  methods: {
    loadData() {
      // Code pour charger les données depuis le serveur
      // URL de l'API que vous souhaitez interroger
      const apiUrl = "http://localhost:3000/tache"; // Remplacez par l'URL réelle de l'API

      // Effectuer la requête GET
      fetch(apiUrl)
          .then(async response => {
            // Vérifier si la réponse est OK (code de statut 200)
            if (!response.ok) {
              throw new Error(`Erreur HTTP! Code de statut: ${response.status}`);
            }
            // Convertir la réponse JSON en objet JavaScript
            this.tasks = await response.json();

            this.tasks.forEach((task) => {
              if (!this.categories.some(objet => objet.idCategorie === task.categorie.idCategorie)) {
                this.categories.push(task.categorie);
                console.log('categories', this.categories);
              }
            });
          })
          .then(async data => {
            // Traiter les données récupérées de l'API
            console.log("Données de l'API:", await data);
          })
          .catch(error => {
            console.error("Erreur lors de la requête GET:", error);
          });
    },
    addTask() {
      // Vous pouvez émettre un événement ici pour envoyer la nouvelle tâche au composant parent
      this.$emit('task-added', this.newTask);
      // Utilisez la méthode fetch() pour effectuer la requête POST
      fetch('http://localhost:3000/tache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Assurez-vous d'adapter le type de contenu en fonction de votre API
        },
        body: JSON.stringify(this.newTask),
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erreur HTTP! Code de statut: ${response.status}`);
            }
            this.newTask = {
                  titreTache: '',
                  description: '',
                  dateEcheance: '',
                  idCategorie: null,
            }
            this.loadData();
            return response.json();
          })
          .then(data => {
            // Traitez la réponse de l'API (si nécessaire)
            console.log('Réponse de l\'API:', data);
          })
          .catch(error => {
            console.error('Erreur lors de la requête POST:', error);
          });


    },
    tachesFiltrees() {
      // Filtrer les tâches en fonction de la catégorie sélectionnée
    },
    editTask (task) {
      console.log('task', task)
      this.$router.push({ name: 'edit', params: { tack: task, categories: this.categories } });
    },
    deleteTask(id) {
        // Effectuer une requête DELETE vers l'API avec l'ID de l'élément
        fetch(`http://localhost:3000/tache/`+id, {
          method: 'DELETE',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP! Code de statut: ${response.status}`);
          }
          this.loadData();
          console.log(`Élément avec l'ID ${id} supprimé avec succès.`);
          // Ici, vous pouvez mettre à jour l'interface utilisateur pour refléter la suppression
        })
        .catch(error => {
          console.error(`Erreur lors de la suppression de l'élément : ${error}`);
        });
  },


  },
  mounted() {
    this.loadData();
  }
};
</script>
<style scoped>
/* Styles pour le tableau */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Styles pour le bouton Supprimer */
button {
  background-color: #ff5733;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #ff2600;
}

/* Styles pour les titres de colonnes */
th {
  font-weight: bold;
}

   /* Styles pour le formulaire de création de tâche */
 form {
   max-width: 400px;
   margin: 0 auto;
   padding: 20px;
   border: 1px solid #ccc;
   border-radius: 5px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }

label {
  display: block;
  margin-top: 10px;
}

input[type="text"],
textarea,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

</style>

