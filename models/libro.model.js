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
    numero_paginas: {
        require: true,
        type: String
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
    },
    editorial: {
        type: Schema.Types.ObjectId,
        ref: 'Editorial',
    }
}, { collection: 'libros'});

LibroSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Libro', LibroSchema);