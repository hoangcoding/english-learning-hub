const express = require('express');
const validate = require('express-validation');
const controller = require('./controller');
const { authorize } = require('../../../middlewares/auth');
const {
    add,
    get,
    list,
} = require('./validation');

const routes = express.Router();
routes.param('lessonId', controller.load);

routes.route('/add').post(validate(add), authorize(), controller.add);
routes.route('/get/:lessonId').get(validate(get), authorize(), controller.get);
routes.route('/list/byTopic/:topicName').get(validate(list), authorize(), controller.listByTopic);
routes.route('/list/random/:amount').get(validate(list), authorize(), controller.listRandom);


module.exports = routes;
