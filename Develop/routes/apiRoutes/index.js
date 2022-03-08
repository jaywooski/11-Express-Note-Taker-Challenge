const path = require('path');
const router = require('express').Router();
const db = require('../../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// get api/notes ... should read db.json file and return all saved
// notes as JSON
router.get('/notes', (req, res) => {
    const data = db;
    const query = req.query;
    if(query.title) {
        data = data.filter(note => note.title === query.title)
    }
    res.json(data);
})

// POST api/notes should recieve new note as req.body, add to db.json
// file and return the new note to the client
router.post('/notes', (req, res) => {
    const data = db;
    const note = req.body;
    note.id = uuidv4();

    if (note) {
        data.push(note);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify( data , null, 2)
        );
        res.json(data);
        
    } 
    else {
        res.status(400).send('Bad request, try entering again!');
    }
})

// Delete /api/notes/:id ... should recieve query param containing ID of a note
// In order to delete
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const data = db;
    
    if(noteId) {
        
        const result = data.filter(note => note.id != noteId);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify( data , null, 2)
        );
        res.json(result);
        
    }
    else {
        res.sendStatus(404);
    }   
})

router.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const data = db;
    
    if(noteId <= data.length) {

        const result = data.filter(note => note.id == noteId); 
        res.json(result);
    }
    else {
        res.send(404);
    }   
})

module.exports = router;