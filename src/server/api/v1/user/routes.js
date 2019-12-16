const express = require('express');
const validate = require('express-validation');
const controller = require('./controller');

const {
    register,
    login,
    refreshToken,
    changePassword,
    addWord,
    getProgress
} = require('./validation');

const { authorize } = require('../../../middlewares/auth');

const routes = express.Router();

routes.route('/register').post(validate(register), controller.register);
routes.route('/login').post(validate(login), controller.login);
routes.route('/logout').put(validate(refreshToken), authorize(), controller.logout);
routes.route('/change-password').put(validate(changePassword), authorize(), controller.changePassword);
routes.route('/addWord').post(validate(addWord), authorize(), controller.addWord);
routes.route('/getProgress').get(validate(getProgress), authorize(), controller.getProgress);

module.exports = routes;