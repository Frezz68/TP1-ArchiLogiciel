/*const taches = [
    { titre: 'Test', dateEcheance: '2023-10-25', categorie: 'Catégorie 1' },
    { titre: 'Tâche 2', dateEcheance: '2023-11-15', categorie: 'Catégorie 245654' },
    { titre: 'Tâche 3', dateEcheance: '2023-10-30', categorie: 'Catégorie 1' },
    { titre: 'Tâche 4', dateEcheance: '2023-11-10', categorie: 'Catégorie 3' },
];*/

fetch("http://localhost:3000/tache")
    .then(async response => {
        if (!response.ok) {
            throw new Error("Erreur de réponse HTTP: " + response.status);
        }
        const tableauBody = document.getElementById('tableau-body');
        const taches = await response.json();
        console.log("test");
// Boucle à travers les tâches et crée des lignes pour chaque tâche
        for (let i = 0; i < taches.length; i++) {
            const item = taches[i];
            const categories = [];

            //Ajoute la catégorie dans une liste si elle n'y est pas déjà
            if (!categories.includes(item.categorie.idCategorie)) {
                categories.push(item.categorie);
            }
            console.log(categories);

            categories.forEach(function(optionText) {
                const option = document.createElement("option");
                option.value = optionText.idCategorie;
                option.textContent = optionText.libelleCategorie;
                selectElement.appendChild(option);
            });

            const row = document.createElement('tr');
            const titreCell = document.createElement('td');
            const dateEcheanceCell = document.createElement('td');
            const categorieCell = document.createElement('td');

            titreCell.textContent = item.titreTache;
            dateEcheanceCell.textContent = item.dateEcheance;
            categorieCell.textContent = item.categorie.libelleCategorie;

            row.appendChild(titreCell);
            row.appendChild(dateEcheanceCell);
            row.appendChild(categorieCell);

            tableauBody.appendChild(row);
        }
        return await response.json(); // Convertir la réponse en JSON
    })
    .then(async data => {
        // Traiter les données ici (par exemple, afficher les données dans la console)
        console.log(await data);
    })
    .catch(error => {
        // Gérer les erreurs ici
        console.error("Erreur de requête: " + error.message);
    });

// Gérer la soumission du formulaire pour ajouter une tâche
const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    console.log("test create", document.getElementById("dynamic-select").value);
    console.log(document.getElementById("task-title").value);
    const tache = {
        titreTache: document.getElementById("task-title").value,
        description: document.getElementById("task-description").value,
        dateEcheance: document.getElementById("task-due-date").value,
        categorie: document.getElementById("dynamic-select").value
    }

    fetch('http://localhost:3000/tache', {
        method: 'POST',
        body: tache,
    })
        .then(response => response.json())
        .then(data => {
            // Traiter la réponse de l'API ici
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur : ', error);
        });

    // Réinitialiser le formulaire
    taskForm.reset();
});

const selectElement = document.getElementById("dynamic-select");

// Parcourez le tableau de données et ajoutez chaque élément comme une option au select
