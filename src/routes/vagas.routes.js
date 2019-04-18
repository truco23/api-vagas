const vagasController = require('../controllers/vagas.controller');

module.exports = app => {

    app
        .route('/vagas')
        .get(vagasController.list)
}