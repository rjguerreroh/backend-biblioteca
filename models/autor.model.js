const {Schema, model} = require('mongoose');

const AutorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    ciudad:{
        type: Schema.Types.ObjectId,
        ref: 'Ciudad'
    },
    telefono: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    fecha_nacimiento: {
        type: String,
        require: true
    }
}, { collection: 'autores'});

AutorSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Autor', AutorSchema);