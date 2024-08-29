const { addNote, getNoteById, updateNoteById, deleteNoteById, getAllNotes } = require('../notes.js');
const {pool} = require('../db.js');

describe('Notes Manager', () => {
  beforeEach(async () => {
    // Nettoyer la base de données avant chaque test
    await pool.query('DELETE FROM notes');
  });

  afterAll(async () => {
    // Fermer la connexion à la base de données après tous les tests
    await pool.end();
  });

  test('should add a note', async () => {
    const note = await addNote('Test note', 3);
    expect(note).toHaveProperty('id');
    expect(note).toHaveProperty('content', 'Test note');
    expect(note).toHaveProperty('importance', 3);
  });

  test('should get a note by id', async () => {
    const note = await addNote('Another note', 2);
    const fetchedNote = await getNoteById(note.id);
    expect(fetchedNote).toMatchObject({
      id: note.id,
      content: note.content,
      importance: note.importance,
    });
  });
  

  test('should update a note', async () => {
    const note = await addNote('Update me', 1);
    const updatedNote = await updateNoteById(note.id, 'Updated content', 5);
    expect(updatedNote).toHaveProperty('content', 'Updated content');
    expect(updatedNote).toHaveProperty('importance', 5);
  });

  test('should delete a note', async () => {
    const note = await addNote('Delete me', 4);
    const deleted = await deleteNoteById(note.id);
    expect(deleted).toBe(true);
    const fetchedNote = await getNoteById(note.id);
    expect(fetchedNote).toBeNull();
  });

  test('should get all notes', async () => {
    await addNote('First note', 1);
    await addNote('Second note', 2);
    const allNotes = await getAllNotes();
    expect(allNotes).toHaveLength(2);
  });
});