const path = require('path');
const router = require('express').Router();
const { getNotes, saveNote } = require('../../public/assets/js/index')
const db = require('../../db/db.json');
// get api/notes ... should read db.json file and return all saved
// notes as JSON
router.get('/api/notes/', (req, res) => {
    getNotes()
})

// POST api/notes should recieve new note as req.body, add to db.json
// file and return the new note to the client
router.post('/api/notes', (req, res) => {
    
    const note = req.body;

    if (note) {
        res.json(note)

        return note;
    } 
    else {
        res.status(400).send('Bad request, try entering again!');
    }
})

// Delete /api/notes/:id ... should recieve query param containing ID of a note
// In order to delete
router.delete('/api/notes/:id', (req, res) => {
    const note = req.params.id;
})