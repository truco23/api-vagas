const adminModel    = require('../models/admin.model');
const jwt           = require('jsonwebtoken');
const authSecret    = require('../config/auth.secret');

let api = {};

api.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const login = await adminModel.findOne({ email, password });

        if(login) {

            login.password = undefined;
            console.log('############# Logado ###############');
            console.log(login)
            console.log('####################################');

            const token = jwt.sign(
                { email: login.email },
                authSecret.secret,
                { expiresIn: 86400 }
            );

            res.set('x-access-token', token);
            res.json({login, token});
        } else {
            console.log('E-mail ou senha inválidos');
            res.json({fail: 'E-mail ou senha inválidos'});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

api.requireToken = async (req, res, next) => {

    const token = req.headers['x-access-token'];
    console.log(token);
    console.log('Caminho exige token');
    next();
}

module.exports = api;