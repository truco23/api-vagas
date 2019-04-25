const vagasController = require('../controllers/vagas.controller');
const loginController = require('../controllers/login.controller');

module.exports = app => {

    app
        .route('/vagas')
        .get(vagasController.list)
        .post(loginController.requireToken, vagasController.add)

    app
        .route('/vagas/:id')
        .get(vagasController.listById)
        .put(loginController.requireToken, vagasController.update)
        .delete(loginController.requireToken, vagasController.remove)
}