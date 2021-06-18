const {Schema, model} = require('mongoose');

const LibroSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    ano:{
        type: String,
        require: true
    },
    genero: {
        type: String,
        require: true
    },
    numero_paginas: {
        require: true,
        type: String
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
        require: true
    },
    editorial: {
        type: Schema.Types.ObjectId,
        ref: 'Editorial',
        require: true,
    }
}, { collection: 'Libros'});

LibroSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Libro', LibroSchema);