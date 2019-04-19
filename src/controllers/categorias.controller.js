const categoriasModel   = require('../models/categorias.model');
let api                 = {};

api.list = async (req, res) => {

    const categorias = await categoriasModel.find({});

    try {
        console.log('############# Listando categorias ###############');
        res.json(categorias)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
};

api.add = async (req, res) => {

    const { name } = req.body;
    const categoria = await categoriasModel.create({ name });

    try {
        
        if(categoria) {
            
            console.log('############# Categoria cadastrada ###############');
            console.log(categoria);
            console.log('##################################################');
            res.json(categoria);
        };
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
}

module.exports = api;