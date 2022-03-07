const path = require('path');
const router = require('express').Router();
// const { getNotes, saveNote, deleteNote } = require('../../public/assets/js/index')
const db = require('../../db/db.json');
const fs = require('fs');


// get api/notes ... should read db.json file and return all saved
// notes as JSON
router.get('/notes', (req, res) => {
    let data = db;
    let query = req.query;
    if(query.title) {
        data = data.filter(note => note.title === query.title)
    }
    return data;
})

// POST api/notes should recieve new note as req.body, add to db.json
// file and return the new note to the client
router.post('/notes', (req, res) => {
    const data = db;
    let text = req.body;
    text.id = data.length;

    if (text) {
        data.push(text);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify( { text : data }, null, 2)
        );
        return text;
    } 
    else {
        res.status(400).send('Bad request, try entering again!');
    }
})

// Delete /api/notes/:id ... should recieve query param containing ID of a note
// In order to delete
router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    let data = db;
    const result = data.filter(note => note.id = noteId)[0]; 

    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
})

module.exports = router;