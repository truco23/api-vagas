const adminController = require('../controllers/admin.controller');

module.exports = app => {

    app
        .route('/admin/users/list')
        .get(adminController.list)
};