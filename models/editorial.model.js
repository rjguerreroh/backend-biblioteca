const {Schema, model} = require('mongoose');

const EditorialSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    direccion_correspondecia: {
        type: String,
        require: true
    },
    maximo_libros: {
        type: String,
        require: true
    }
}, { collection: 'editoriales'});

EditorialSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Editorial', EditorialSchema);