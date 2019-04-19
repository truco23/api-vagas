const categoriaController = require('../controllers/categorias.controller');

module.exports = app => {

    app
        .route('/categorias')
        .get(categoriaController.list)
        .post(categoriaController.add)

    app
        .route('/categorias/:id')
        .get(categoriaController.listById)
        .put(categoriaController.update)
        .delete(categoriaController.delete)
}