const Joi = require('joi');

const headers = {
    headers: Joi.object({
        authorization: Joi.string()
            .trim()
            .required()
            .label('Auth Token'),
    }).options({ allowUnknown: true }),
};

module.exports = {
    // POST /v1/user/addword
    addWord: {
        ...headers,
        body: {
            word: Joi.string()
                .required()
                .trim(),
            topic: Joi.string()
                .required()
                .trim(),
        },
    },
    // Get /v1/user/getProgress
    getProgress: {
        ...headers,
        query: {
            topic: Joi.string().trim(),
        }
    },
    // POST /v1/user/change-password
    changePassword: {
        ...headers,
        body: {
            oldPassword: Joi.string()
                .required()
                .trim()
                .min(8)
                .max(16),
            password: Joi.string()
                .required()
                .trim()
                .min(8)
                .max(16),
        },
    },

    // POST /v1/user/login
    login: {
        body: {
            clientType: Joi.string()
                .valid('browser', 'ios', 'android')
                .lowercase()
                .trim()
                .required(),
            deviceToken: Joi.string()
                .optional()
                .trim()
                .default(''),
            email: Joi.string()
                .required()
                .lowercase()
                .trim()
                .label('Email or phone number'),
            password: Joi.string()
                .min(8)
                .max(16)
                .required()
                .trim(),
        },
    },

    // Get /v1/user/refresh-token
    refreshToken: {
        ...headers,
        body: {
            refreshToken: Joi.string()
                .required()
                .trim(),
        },
    },

    // POST /v1/user/register
    register: {
        body: {
            email: Joi.string()
                .email()
                .lowercase()
                .trim()
                .required(),
            firstName: Joi.string()
                .trim()
                .lowercase()
                .required(),
            lastName: Joi.string()
                .trim()
                .lowercase()
                .required(),
            password: Joi.string()
                .min(8)
                .max(16)
                .required()
                .trim(),
        },
    },
};
