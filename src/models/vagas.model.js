const mongoose = require('mongoose');

const vagas = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    idCategory: {
        type: mongoose.Schema.Types.ObjectId, ref: 'categorias'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('vagas', vagas);