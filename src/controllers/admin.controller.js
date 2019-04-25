const adminModel = require('../models/admin.model');

let api          = {};

api.list = async (req, res) => {
    
    try {
        const admins = await adminModel.find({}).sort({ createdAt: -1});

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

api.listById = async (req, res) => {

    try {
        
        const { id } = req.params;
        const admin = await adminModel.findOne({ _id: id });

        if(admin) {
            console.log('############# Admin encontrado ###############');
            console.log(admin);
            console.log('##############################################');
            res.json(admin);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
}

api.add = async (req, res) => {

    try {

        const { email, password }  = req.body;
        
        await adminModel.create({ email, password }, (erro, admin) => {
            
            if(erro) {

                console.log(erro.errmsg);
                console.log('E-mail já está cadastrado em nosso sistema');
                
                res.status(400).json({ 
                        fail: erro.errmsg, 
                        status: 'E-mail já está cadastrado em nosso sistema' 
                });
                return;
            };

            console.log('############# Admin cadastrado ###############');
            console.log(admin);
            console.log('##############################################');
            res.json(admin);
        })
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
};

api.update = async (req, res) => {

    try {
        
        const { id } = req.params;
        const admin = await adminModel.findOneAndUpdate({ _id: id }, { $set: req.body});

        if(admin) {

            admin.set(req.body);
            admin.save();
            console.log('############# Admin alterado ###############');
            console.log(admin);
            console.log('##############################################');
            res.json(admin);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

api.remove = async (req, res) => {

    try {
        
        const { id } = req.params;
        const admin = await adminModel.findOneAndDelete({ _id: id });

        if(admin) {

            console.log('############# Admin removido ###############');
            console.log(admin);
            console.log('#############################################');
            res.status(200).json({ success: 'Admin removido' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
}

module.exports = api;