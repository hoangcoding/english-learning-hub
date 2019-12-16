const httpStatus = require('http-status');
const Lesson = require('./model');
const {Error} = require('../../../utils/api-response');
const {getTopicProcess} = require('../user/controller');
/**
 * Load lesson and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
    try {
        const lesson = await Lesson.get(id);
        req.locals = {lesson};
        return next();
    } catch (error) {
        return next(Error({
            message: 'Lesson not found',
            status: httpStatus.NOT_FOUND,
            stack: error.stack,
        }));
    }
};

/**
 * Get lesson
 * @public
 */
exports.get = (req, res) => res.json(req.locals.product.transform());

exports.add = async (req, res, next) => {
    try {
        const lesson = new Lesson(req.body);
        const savedLesson = await lesson.save();
        res.status(httpStatus.CREATED);
        res.json(savedLesson.transform());
    } catch (error) {
        return next(Error({
            message: 'Add new lesson failed',
            status: httpStatus.CONFLICT,
            stack: error.stack,
        }));
    }
};

exports.listByTopic = async (req, res, next) => {
    try {
        const {topicName} = req.params;
        const list = await Lesson.find({topic: topicName}).exec();
        const listTransformed = list.map(lesson => lesson.transform());
        const process = await getTopicProcess(topicName, req.user);
        res.json({
            ...process,
            list: listTransformed
        });
    } catch (error) {
        return next(Error({
            message: 'Get list by topic failed',
            status: httpStatus.CONFLICT,
            stack: error.stack,
        }));
    }
};
exports.listRandom = async (req, res, next) => {
    try {
        const {amount} = req.params;
        const list = await Lesson.aggregate([{$sample: {size: amount}}]).exec();
        res.json(list);
    } catch (error) {
        return next(error);
    }
};

