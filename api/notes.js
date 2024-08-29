const {pool} = require('./db.js');

/**
 * Ajoute une nouvelle note dans la base de données.
 * @param {string} content - Le contenu de la note.
 * @param {number} importance - L'importance de la note (1-5).
 * @returns {Object} - La note ajoutée.
 */

// export async function addNote(content, importance) {
//   const [result] = await pool.query('INSERT INTO notes (content, importance) VALUES (?, ?)', [content, importance]);
//   return { id: result.insertId, content, importance };
// }

 async function addNote(content, importance) {
  try {
    const [result] = await pool.query('INSERT INTO notes (content, importance) VALUES (?, ?)', [content, importance]);
    return { id: result.insertId, content, importance };
  } catch (error) {
    console.error('Error while adding note:', error);  // Loguer l'erreur
    throw error;  // Relancer l'erreur pour qu'elle soit capturée par la route
  }
}



/**
 * Récupère toutes les notes depuis la base de données.
 * @returns {Array} - Liste de toutes les notes.
 */
 async function getAllNotes() {
  const [rows] = await pool.query('SELECT * FROM notes');
  return rows;
}

/**
 * Récupère une note spécifique par son ID.
 * @param {number} id - L'ID de la note.
 * @returns {Object|null} - La note correspondante ou null si elle n'existe pas.
 */
 async function getNoteById(id) {
  const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
  if (rows.length === 0) return null;
  return rows[0];
}

/**
 * Met à jour une note dans la base de données.
 * @param {number} id - L'ID de la note.
 * @param {string} content - Le nouveau contenu de la note.
 * @param {number} importance - La nouvelle importance de la note (1-5).
 * @returns {Object|null} - La note mise à jour ou null si elle n'existe pas.
 */
async function updateNoteById(id, content, importance) {
  const [result] = await pool.query('UPDATE notes SET content = ?, importance = ? WHERE id = ?', [content, importance, id]);
  if (result.affectedRows === 0) return null;
  return { id, content, importance };
}

/**
 * Supprime une note de la base de données.
 * @param {number} id - L'ID de la note.
 * @returns {boolean} - true si la note a été supprimée, false si elle n'existait pas.
 */
async function deleteNoteById(id) {
  const [result] = await pool.query('DELETE FROM notes WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  addNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  getAllNotes,
};