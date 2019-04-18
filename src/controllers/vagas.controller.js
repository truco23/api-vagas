const vagasModel = require('../models/vagas.model');

let api = {};

api.list = async (req, res) => {

    
    try {
        const vagas = await vagasModel.find({});
        console.log('Vagas listadas');
        res.json(vagas)
    } catch (error) {
        console.log(error);
        res.status(400).json({ fail: error })
    }
}

module.exports = api;