const vagasModel = require('../models/vagas.model');

let api = {};

api.list = async (req, res) => {

    
    try {
        const vagas = await vagasModel.find({});
        console.log('Vagas listadas');
        res.json(vagas)
    } catch (error) {
        console.log(error);
        res.status(400).json({ fail: error.message })
    }
};

api.add = async (req, res) => {

    console.log(req.body);

    const { title, description  } = req.body;
    
    try {
        
        const vaga = await vagasModel.create({ title, description });

        console.log('############# Vaga cadastrada ###############');
        console.log(vaga);
        console.log('############################');
        
        res.json(vaga);
    } catch (error) {
        console.log(error);
        res.status(500).json({ fail: error.message })
    }
}

module.exports = api;