const adminModel = require('../models/admin.model');

let api          = {};

api.list = async (req, res) => {
    
    try {
        const admins = await adminModel.find({});

        if(admins) {
            console.log('############# Admins listados ###############');
            res.json(admins);
            return;
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({fail: error.message });
    }
    
};

api.add = async (req, res) => {

    try {

        const { email, password }  = req.body;
        const admin = await adminModel.create({ email, password });

        if(admin) {

            console.log('############# Admin cadastrado ###############');
            console.log(admin);
            console.log('##############################################');
            res.json(admin);
        }
    } catch (error) {
        console.log(error.message);
        
        if(error.errors.email) {

            console.log('############# Email não informado ###############');
            res.json({ fail: 'E-mail não informado' });
            return;
        } else if(error.errors.password) {
            
            console.log('############# Senha não informada ###############');
            res.json({ fail: 'Senha não informada' });
            return;
        } else {
            res.status(400).json({ fail: error.message });
            return;
        }
    };
}

module.exports = api;