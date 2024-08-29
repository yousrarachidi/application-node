document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('note-form');
  const noteContent = document.getElementById('note-content');
  const importance = document.getElementById('importance');
  const notesList = document.getElementById('notes-list');

  // Utiliser directement l'URL de l'API
  const apiUrl = 'http://localhost:3000';

  // Charger les notes existantes
  fetch(`${apiUrl}/api/notes`)
    .then(response => response.json())
    .then(notes => {
      notes.forEach(note => appendNoteToList(note));
    })
    .catch(error => console.error('Error fetching notes:', error));

  // Ajouter une nouvelle note
  noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = noteContent.value.trim();
    const importanceValue = parseInt(importance.value, 10);

    if (content && importanceValue >= 1 && importanceValue <= 5) {
      fetch(`${apiUrl}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, importance: importanceValue }),
      })
        .then(response => response.json())
        .then(note => {
          appendNoteToList(note);
          noteContent.value = '';
          importance.value = 1;
        })
        .catch(error => console.error('Error adding note:', error));
    }
  });

  // Supprimer une note
  function deleteNote(id) {
    fetch(`${apiUrl}/api/notes/${id}`, { method: 'DELETE' })
      .then(() => {
        document.getElementById(`note-${id}`).remove();
      })
      .catch(error => console.error('Error:', error));
  }

  function appendNoteToList(note) {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.id = `note-${note.id}`;

    const noteContent = document.createElement('div');
    noteContent.className = 'note-content';
    noteContent.textContent = note.content;

    // Créer un conteneur pour les étoiles
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';

    // Ajouter les étoiles en fonction de l'importance
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.className = i <= note.importance ? 'fas fa-star' : 'far fa-star';
        starContainer.appendChild(star);
    }

    // Créer un sélecteur pour modifier l'importance
    const importanceSelector = document.createElement('select');
    importanceSelector.className = 'importance-selector';
    importanceSelector.style.display = 'none'; // Caché par défaut

    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} ${i === 1 ? 'Star' : 'Stars'}`;
        if (i === note.importance) {
            option.selected = true;
        }
        importanceSelector.appendChild(option);
    }

    const noteActions = document.createElement('div');
    noteActions.className = 'note-actions';

    // Bouton pour supprimer la note
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Icône poubelle
    deleteButton.addEventListener('click', () => deleteNote(note.id));

    // Bouton pour mettre à jour la note
    const updateButton = document.createElement('button');
    updateButton.className = 'update-button';
    updateButton.innerHTML = '<i class="fas fa-edit"></i>'; // Icône d'édition

    let isEditing = false;

    updateButton.addEventListener('click', () => {
        if (!isEditing) {
            noteContent.contentEditable = true;
            starContainer.style.display = 'none'; // Cacher les étoiles
            importanceSelector.style.display = 'inline-block'; // Afficher le sélecteur
            updateButton.innerHTML = '<i class="fas fa-save"></i>'; // Icône de sauvegarde
            deleteButton.style.display = 'none'; // Cacher le bouton Delete pendant l'édition
            isEditing = true;
        } else {
            const updatedContent = noteContent.textContent;
            const updatedImportance = parseInt(importanceSelector.value, 10);

            if (updatedImportance >= 1 && updatedImportance <= 5) {
                updateNote(note.id, updatedContent, updatedImportance).then(() => {
                    noteContent.contentEditable = false;
                    starContainer.innerHTML = ''; // Effacer les étoiles existantes
                    for (let i = 1; i <= 5; i++) {
                        const star = document.createElement('i');
                        star.className = i <= updatedImportance ? 'fas fa-star' : 'far fa-star';
                        starContainer.appendChild(star);
                    }
                    starContainer.style.display = 'block'; // Réafficher les étoiles
                    importanceSelector.style.display = 'none'; // Cacher à nouveau le sélecteur
                    updateButton.innerHTML = '<i class="fas fa-edit"></i>'; // Revenir à l'icône d'édition
                    deleteButton.style.display = 'inline-block'; // Réafficher le bouton Delete
                    isEditing = false;
                }).catch(error => {
                    console.error('Erreur lors de la mise à jour:', error);
                });
            } else {
                alert('L\'importance doit être un nombre entre 1 et 5.');
            }
        }
    });

    noteActions.appendChild(updateButton);
    noteActions.appendChild(deleteButton);
    noteItem.appendChild(noteContent);
    noteItem.appendChild(starContainer); // Ajouter le conteneur d'étoiles en dessous du texte
    noteItem.appendChild(importanceSelector); // Ajouter le sélecteur d'importance
    noteItem.appendChild(noteActions);

    notesList.appendChild(noteItem);
}



function updateNote(id, content, importance) {
  console.log('Envoi de la requête pour la mise à jour...');
  return fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, importance }),
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erreur réseau lors de la mise à jour.');
          }
          return response.json();
      })
      .then(updatedNote => {
          console.log('Réponse de l\'API après mise à jour:', updatedNote);
          return updatedNote;
      })
      .catch(error => {
          console.error('Erreur lors de la mise à jour de la note:', error);
          throw error;
      });
}


});
