const categoriaController   = require('../controllers/categorias.controller');
const loginController       = require('../controllers/login.controller');

module.exports = app => {

    app
        .route('/categorias')
        .get(categoriaController.list)
        .post(loginController.requireToken, categoriaController.add)

    app
        .route('/categorias/:id')
        .get(categoriaController.listById)
        .put(loginController.requireToken, categoriaController.update)
        .delete(loginController.requireToken, categoriaController.delete)
}