const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    genero: {
        type: String,
        required: true
    },

    categoria: {
        type: String,
        required: true
    },

    images: [{
        type: String,
        required: true
    }]

});

module.exports = mongoose.model('products', productSchema);