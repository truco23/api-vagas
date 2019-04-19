const categoriasModel   = require('../models/categorias.model');
let api                 = {};

api.list = async (req, res) => {

    const categorias = await categoriasModel.find({});

    try {
        console.log('############# Categorias listadas ###############');
        res.json(categorias)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
}

module.exports = api;