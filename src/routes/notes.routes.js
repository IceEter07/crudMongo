const {Router} = require('express')
const router = Router();

const notesCtrl = require('../controllers/notes.controller');

const auth = require('../helpers/auth')
//New note
router.get('/notes/add', auth.validation, notesCtrl.renderNoteForm)

router.post('/notes/new-note', auth.validation, notesCtrl.createNewNote)

//Get all notes
router.get('/notes', auth.validation, notesCtrl.renderNotes)

//Edit notes
router.get('/notes/edit/:id', auth.validation, notesCtrl.renderEditForm)
router.put('/notes/edit/:id', auth.validation, notesCtrl.updateNote)

//Delete notes
router.delete('/notes/delete/:id', auth.validation, notesCtrl.deleteNote)



module.exports = router;