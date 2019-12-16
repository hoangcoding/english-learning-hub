/* eslint-disable no-invalid-this */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const dayjs = require('dayjs');
const jwt = require('jwt-simple');
const { Error } = require('../../../utils/api-response');
const Lesson = require('./../lesson/model');

const {
    env, jwtSecret, jwtExpirationInterval,
} = require('../../../config');

/**
 * User Schema
 * @private
 */

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    learnedWords: [{
        word: {
            type:String,
            lowercase: true,
        },
        topic: {
            type: String,
            enum: Lesson.topics,
        }
    }],
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    sessions: [
        {
            access_token: { type: String },
            client_type: { type: String },
            createdAt: {
                default: dayjs().valueOf(),
                type: Number,
            },
            device_token: { type: String },
            is_active: {
                default: true,
                type: String,
            },
            refresh_token: { type: String },
            socket_id: { type: String },
        },
    ],
    createdAt: {
        default: Date.now,
        type: Number,
    },
    updatedAt: {
        default: Date.now,
        type: Number,
    },
    verifyTokens: {
        email: {
            default: '',
            type: String,
        },
        reset_password: {
            default: '',
            type: String,
        },
    },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) return next();

        const rounds = env === 'test' ? 1 : 10;

        const hash = await bcrypt.hash(this.password, rounds);

        this.password = hash;

        return next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Methods
 */
userSchema.method({
    transform() {
        const transformed = {};
        const fields = [
            'id',
            'email',
            'firstName',
            'lastName',
            'sessions',
            'learnedWords',
            'createdAt',
            'updatedAt',
            'verifyTokens',
        ];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },

    async passwordMatches(password) {
        const result = await bcrypt.compare(password, this.password);

        return result;
    },
    token() {
        const date = dayjs();
        const payload = {
            _id: this._id,
            exp: date.add(60, 'day').valueOf(),
            iat: date.valueOf(),
        };

        return jwt.encode(payload, jwtSecret);
    },
});

/**
 * Statics
 */
userSchema.statics = {

    /**
     * Return new validation error
     * if error is a mongoose duplicate key error
     *
     * @param {Error} error
     * @returns {Error|APIError}
     */
    checkDuplicateEmail(error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return new Error({
                message: 'Validation Error',
                errors: [{
                    field: 'email',
                    location: 'body',
                    // messages: ['"email" already exists'],
                    messages: ['User already exists. Please try log in'],
                }],
                status: httpStatus.CONFLICT,
                isPublic: true,
                stack: error.stack,
            });
        }
        return error;
    },
};

/**
 * @typedef User
 */

const model = mongoose.model('User', userSchema);


module.exports = model;
