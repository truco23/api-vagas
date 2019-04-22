const adminController = require('../controllers/admin.controller');

module.exports = app => {

    app
        .route('/admin/users/list')
        .get(adminController.list)

    app
        .route('/admin/users/new')
        .post(adminController.add)

    app
        .route('/admin/users/:id')
        .get(adminController.listById)
};