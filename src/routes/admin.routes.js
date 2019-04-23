const adminController = require('../controllers/admin.controller');
const loginController = require('../controllers/login.controller');

module.exports = app => {

    app
        .route('/admin/*')
        .get(loginController.requireToken)
        
    app
        .route('/admin/users/list')
        .get(adminController.list)

    app
        .route('/admin/users/new')
        .post(adminController.add)

    app
        .route('/admin/users/:id')
        .get(adminController.listById)
        .put(adminController.update)
        .delete(adminController.remove)
};