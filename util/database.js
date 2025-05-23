import Database from 'better-sqlite3';

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title STRING,
    content STRING
)`).run();


export const getAllNotes = () => {
    const stmt = db.prepare('SELECT * FROM notes');
    return stmt.all();
}
export const getNotesById = (id) => {
    const stmt = db.prepare('SELECT * FROM notes WHERE id = ?');
    return stmt.get(id);
}
export const createNote = (title, content) => {
    const stmt = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
    return stmt.run(title, content);
}
export const deleteNote = (id) => {
    const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
    return stmt.run(id);
}

const notes = [{id:1 , title: 'Note 1', content: 'content 1',}, {id:2, title: 'Note 2', content: 'content 2'}, {id:3, title: 'Note 3', content: 'content 3'}];

// for(const note of notes){
//     createNote(note.title, note.content);
// }