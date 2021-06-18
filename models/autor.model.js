const {Schema, model} = require('mongoose');

const AutorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    ciudad_procedencia:{
        type: Schema.Types.ObjectId,
        ref: 'Ciudad',
        require: true
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
}, { collection: 'Autores'});

AutorSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Autor', AutorSchema);