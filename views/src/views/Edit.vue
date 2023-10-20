<template>
  <form @submit.prevent="submitForm">
    <label for="title">Titre :</label>
    <input type="text" id="title" v-model="editedTask.titreTache" required>

    <label for="description">Description :</label>
    <textarea id="description" v-model="editedTask.description"></textarea>

    <label for="dueDate">Date d'échéance :</label>
    <input type="date" id="dueDate" v-model="editedTask.dateEcheance" required>

    <label for="category">Catégorie :</label>
    <select id="category" v-model="editedTask.categorie" required>
      <option v-for="option in categories" :key="option.idCategorie" :value="option.idCategorie">{{ option.libelleCategorie }}</option>
    </select>

    <button type="submit">Enregistrer les modifications</button>
  </form>
</template>

<script>
export default {
  props: {
    task: Object,
    categories: Array,
  },
  data() {
    return {
      editedTask: {},
    };
  },
  methods: {
    submitForm() {
      // Envoyez les données modifiées à la page principale pour mise à jour
      this.$emit("update-task", this.editedTask);
      // Utilisez la méthode fetch() pour effectuer la requête POST
      fetch('http://localhost:3000/tache/'+this.task.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Assurez-vous d'adapter le type de contenu en fonction de votre API
        },
        body: JSON.stringify(this.newTask),
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erreur HTTP! Code de statut: ${response.status}`);
            }
            this.task = {
              titreTache: '',
              description: '',
              dateEcheance: '',
              idCategorie: null,
            }


            return response.json();
          })
          .then(data => {
            // Traitez la réponse de l'API (si nécessaire)
            console.log('Réponse de l\'API:', data);
          })
          .catch(error => {
            console.error('Erreur lors de la requête POST:', error);
          });
    }
  },
  mounted() {
    console.log('task', this.task)
    // Copiez les données de la tâche dans l'objet editedTask
    this.editedTask = this.task;
  },
};
</script>
<style scoped>
/* Styles pour la page d'édition */
.page-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* Styles pour le formulaire d'édition */
.form-edit {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
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

button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>


