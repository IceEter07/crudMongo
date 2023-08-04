const notesCtrl = {}

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) =>{
    res.render('notes/newNote')
}

notesCtrl.createNewNote = async (req, res) =>{
    const {title, description} = req.body;
    const newNote = new Note({title, description})
    //Se guarda el ID para aislar los datos entre usuarios
    newNote.user = req.user._id;
    await newNote.save();

    // newNote.user = req.user._id;
    req.flash('success_msg', 'Note Added Succesfully');

    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req, res) =>{
    const notes = await Note.find({user: req.user._id}).sort({createdAt: 'desc' }).lean();
    res.render('notes/allNotes', { notes })
}

notesCtrl.renderEditForm = async (req, res) =>{
    //IMPORTANTE agregar el lean() cuando se quiera hacer una consulta y mostrarla en handlebars para que no muestre error.
    const note = await Note.findById(req.params.id).lean()

    if(note.user != req.user._id){
        req.flash('error_msg', 'Not authorized')
        return res.redirect('/notes')
    }

    res.render('notes/editNote', {note});
}

notesCtrl.updateNote = async (req, res) =>{
    const { title, description} = req.body
    await Note.findByIdAndUpdate(req.params.id, {title, description})

    req.flash('success_msg', 'Note Updated Succesfully');

    res.redirect('/notes');
}

notesCtrl.deleteNote = async (req, res) =>{
    await Note.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Note Deleted Succesfully');

    res.redirect('/notes')
}

module.exports = notesCtrl;