const express = require('express');
const { addNote, getNoteById, updateNoteById, deleteNoteById, getAllNotes } = require('../notes.js');

const router = express.Router();

router.post('/notes', async (req, res) => {
  const { content, importance } = req.body;
  if (!content || typeof importance !== 'number' || importance < 1 || importance > 5) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const newNote = await addNote(content, importance);  // Assure-toi que cette fonction fonctionne correctement
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);  // Ajoute cette ligne pour loguer l'erreur dans la console
    res.status(500).json({ error: 'Failed to add note' });
  }
});


// Route pour récupérer toutes les notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await getAllNotes();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
});

// Route pour récupérer une note par ID
router.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await getNoteById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve note' });
  }
});

// Route pour mettre à jour une note par ID
router.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { content, importance } = req.body;
  try {
    const updatedNote = await updateNoteById(id, content, importance);
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Route pour supprimer une note par ID
router.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const success = await deleteNoteById(id);
    if (!success) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;