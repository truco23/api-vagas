const categoriasModel   = require('../models/categorias.model');
let api                 = {};

api.list = async (req, res) => {
    
    try {
        
        const categorias = await categoriasModel.find({});

        console.log('############# Listando categorias ###############');
        res.json(categorias)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
};

api.listById = async (req, res) => {
    
    try {
        const { id } = req.params;
        const categoria = await categoriasModel.findById({ _id: id });
        
        if(categoria) {
            console.log('############# Categoria localizada ###############');
            console.log(categoria);
            console.log('##################################################');
            res.json(categoria);
            return;
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

api.add = async (req, res) => {

    try {
        
        const { name } = req.body;
        const categoria = await categoriasModel.create({ name });
        
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
};

api.update = async (req, res) => {

    try {
        
        const { id }    = req.params;
        const body      = req.body;
        const categoria = await categoriasModel.findByIdAndUpdate( id, body );

        if(categoria) {

            categoria.set(body);
            categoria.save();
            console.log('############# Categoria alterada ###############');
            console.log(categoria);
            console.log('################################################');
            res.json(categoria);
            return;
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
};

module.exports = api;