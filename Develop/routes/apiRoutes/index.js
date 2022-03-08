const path = require('path');
const router = require('express').Router();
const db = require('../../db/db.json');
const fs = require('fs');


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
    note.id = data.length + 1;

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
    
    if(noteId <= data.length) {
        
        const result = data.filter(note => note.id != noteId);
        const decreaseId = function(array) {
            const setIdToNoteId = (id) => id == noteId; 
            index =  array.findIndex(setIdToNoteId(array.id));
            for(i=index; i <= array.length; i++){
                array[i].id -= 1;
            }
            return array;
        }
        // const final = result.map(note => note.id -= 1)
        // res.json(final)
        res.json(decreaseId(result));
        
    }
    else {
        res.send(404);
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