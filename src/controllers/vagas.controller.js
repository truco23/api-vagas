const vagasModel = require('../models/vagas.model');

let api = {};

api.list = async (req, res) => {

    const vagas = await vagasModel.find({});
    
    try {
        console.log('############# Vagas listadas ###############');
        res.json(vagas)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
};

api.listById = async (req, res) => {

    const { id } = req.params;
    const vaga = await vagasModel.findOne( { _id: id} );
    
    try {

        if(vaga) {

            console.log('############# Vaga localizada ###############');
            console.log(vaga);
            console.log('#############################################');
            res.json(vaga);
            return;
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
    
};

api.add = async (req, res) => {

    const { title, description  } = req.body;
    const vaga = await vagasModel.create({ title, description });
    
    try {
        
        if(vaga) {
            console.log('############# Vaga cadastrada ###############');
            console.log(vaga);
            console.log('#############################################');
            res.json(vaga);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ fail: error.message })
    }
};

api.remove = async (req, res) => {

    const { id } = req.params;
    const vaga = await vagasModel.findByIdAndDelete( { _id: id } );

    try {
        
        if(vaga) {
            console.log('############# Vaga removida ###############');
            console.log(vaga);
            console.log('###########################################');
            res.status(200).json({ success: 'Vaga removida' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

module.exports = api;