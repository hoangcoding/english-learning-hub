const Joi = require('joi');
const Lesson = require('./model');

const headers = {
    headers: Joi.object({
        authorization: Joi.string()
            .trim()
            .required()
            .label('Auth Token'),
    }).options({ allowUnknown: true }),
};


module.exports = {
    add: {
        ...headers,
        body: {
            word: Joi.string()
                .required()
                .trim(),

            description: Joi.string()
                .trim(),
            image: Joi.string()
                .required()
                .trim(),
            topic: Joi.string()
                .valid(Lesson.topics)
        },
    },
    get: {
        ...headers,
        params: {
            lessonId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },
    list: {
        ...headers,
        params: {
            topicName: Joi.string(),
            amount: Joi.number()
        }
    }
};