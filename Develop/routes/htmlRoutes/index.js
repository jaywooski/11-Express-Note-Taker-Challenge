const path = require('path');
const router = require('express').Router();
const db = require('../../db/db.json');
// const { getNotes, saveNote, deleteNote } = require('../../public/assets/js/index')

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/notes.html'))

})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))

})

module.exports = router;