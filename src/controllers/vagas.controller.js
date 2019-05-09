const vagasModel = require('../models/vagas.model');

let api = {};

api.list = async (req, res) => {
    
    try {

        const { page = 1 } = req.query;

        const vagas = await vagasModel.paginate(
            {}, 
            {
                sort: { createdAt: -1 },
                populate: {
                    path: 'idCategory',
                    select: 'name'
                },
                page, limit: 10 
            }
        );

        console.log('############# Vagas listadas ###############');
        res.json(vagas)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
};

api.listById = async (req, res) => {

    try {
        
        const { id } = req.params;
        const vaga = await vagasModel.findOne( { _id: id} ).populate('idCategory', 'name');;

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

    try {
   
        const { title, description, idCategory  } = req.body;
        const vaga = await vagasModel.create({ title, description, idCategory });
        
        if(vaga) {
            console.log('############# Vaga cadastrada ###############');
            console.log(vaga);
            console.log('#############################################');
            req.io.emit('vaga-new', vaga);
            res.json(vaga);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
};

api.update = async (req, res) => {

    try {
        
        const { id } = req.params;
        const vaga = await vagasModel.findByIdAndUpdate( id, req.body );
        
        if(vaga) {
            vaga.set(req.body);
            vaga.save();
            console.log('############# Vaga alterada ###############');
            console.log(vaga);
            console.log('###########################################');
            req.io.emit('vaga-edit', vaga);
            res.json(vaga);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
    
};

api.remove = async (req, res) => {
    
    try {
        
        const { id } = req.params;
        const vaga = await vagasModel.findByIdAndDelete( { _id: id } );
        
        if(vaga) {
            console.log('############# Vaga removida ###############');
            console.log(vaga);
            console.log('###########################################');
            req.io.emit('vaga-remove', vaga);
            res.status(200).json({ success: 'Vaga removida' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

module.exports = api;