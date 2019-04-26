const mongoose      = require('mongoose');
const vagasPaginate = require('mongoose-paginate');

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

vagas.plugin(vagasPaginate);

module.exports = mongoose.model('vagas', vagas);