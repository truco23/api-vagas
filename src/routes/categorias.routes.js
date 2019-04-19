const categoriaController = require('../controllers/categorias.controller');

module.exports = app => {

    app
        .route('/categorias')
        .get(categoriaController.list)
}