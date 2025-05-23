import express from 'express';
import * as db from './util/database.js';

const PORT = 8080;
const app = express();
app.use(express.json());

app.get('/notes', (req, res) => {
    const notes = db.getAllNotes();
    res.status(200).json(notes);
}
);

app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = db.getNotesById(id);
    if (!note){
        return res.status(404).json({message: 'Nem található a jegyzet!'});
    }
    res.status(200).json(note);
});

app.post('/notes', (req, res) => {
    const {title, content} = req.body;
    if (!title || !content){
        return res.status(400).json({message: 'A cím és a tartalom kötelező!'});
    }
    const note = db.createNote(title, content);
    res.status(201).json(note);
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = db.getNotesById(id);
    if (!note){
        return res.status(404).json({message: 'Nem található a jegyzet!'});
    }
    db.deleteNote(id);
    res.status(204).json({message: 'A jegyzet sikeresen törölve!'});
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});