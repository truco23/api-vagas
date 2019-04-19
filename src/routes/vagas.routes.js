const vagasController = require('../controllers/vagas.controller');

module.exports = app => {

    app
        .route('/vagas')
        .get(vagasController.list)
        .post(vagasController.add)

    app
        .route('/vagas/:id')
        .get(vagasController.listById)
}