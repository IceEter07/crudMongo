const {Schema, model} = require('mongoose')

//El esquema permite saber que es lo que quiero guardar en la BD
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }
}, {
    //Permite conocer cuando fue creado y cuando fue actualizado por defecto
    timestamps: true
})

module.exports = model('Note', NoteSchema);

