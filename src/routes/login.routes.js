const loginController = require('../controllers/login.controller');

module.exports = app => {

    app
        .route('/admin')
        .post(loginController.login)
}