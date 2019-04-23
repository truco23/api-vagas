const adminModel = require('../models/admin.model');

let api = {};

api.login = async (req, res) => {

    try {
        console.log(req.body);
        
        const { email, password } = req.body;
        const login = await adminModel.findOne({ email, password });

        if(login) {
            console.log('############# Logado ###############');
            console.log(login)
            console.log('####################################');
            res.json(login)
        } else {
            console.log('E-mail ou senha inválidos');
            res.json({fail: 'E-mail ou senha inválidos'});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
}

module.exports = api;