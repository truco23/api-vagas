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
                { 
                    id: login._id,
                    email: login.email
                },
                authSecret.secret,
                { expiresIn: 86400 }
            );

            res.set('x-access-token', token);
            res.json({login, token});
        } else {
            console.log('E-mail ou senha inválidos');
            res.status(400).json({fail: 'E-mail ou senha inválidos'});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

api.requireToken = async (req, res, next) => {

    console.log('############# Caminho necessita de autenticação ###############');
    const token = req.headers['x-access-token'];

    if(!token) {
        console.log('############# Token não informado ###############');
        res.status(400).json({ fail: 'O token não foi informado' });
        return;
    };

    jwt.verify(token, authSecret.secret, (erro, decoded) => {

        if(erro) {
            console.log('############# Token inválido ###############');
            res.status(400).json({ fail: 'Token inválido' });
            return;
        };

        console.log('############# Acesso permitido ###############');
        req.user = decoded.id;
        next();
    });
}

module.exports = api;