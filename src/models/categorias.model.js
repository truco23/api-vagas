const mongoose      = require('mongoose');
const categorias    = new mongoose.Schema({

    name: {
        required: true,
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('categorias', categorias);