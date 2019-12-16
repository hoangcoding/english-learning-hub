const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const dayjs = require('dayjs');
const uuidv4 = require('uuid/v4');
const User = require('./model');
const Lesson = require('../lesson/model');

const {Error} = require('../../../utils/api-response');
const {env} = require('../../../config');
const {
    jwtExpirationInterval,
} = require('../../../config');
const {
    capitalizeEachLetter, generateRandom,
} = require('../../../utils/methods');
const {keysToCamel} = require('../../../utils/snake');


/**
 * @async
 * Returns a formated object with tokens
 * @param {object} user object
 * @param {string} accessToken token
 * @param {string} refreshObjectId _id of refreshToken if planning to update previous one
 * @returns {object} access token object
 * @private
 */

async function generateTokenResponse(user, deviceInfo) {
    const refreshToken = uuidv4() + user._id;

    // eslint-disable-next-line no-param-reassign
    user.sessions = [
        ...user.sessions,
        {
            ...deviceInfo,
            access_token: user.token(),
            createdAt: dayjs().valueOf(),
            is_active: true,
            refresh_token: refreshToken,
        },
    ];
    user.save();

    const expiresIn = dayjs()
        .add(jwtExpirationInterval, 'minute')
        .valueOf();

    return {
        accessToken: user.token(),
        expiresIn,
        refreshToken,
    };
}


/**
 * Logout
 * @public
 */
exports.logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;

        const user = await User.findOne({
            sessions: {
                $elemMatch: {
                    is_active: true,
                    refresh_token: refreshToken,
                },
            },
        });

        if (!user) {
            throw new Error({
                message: 'Refresh token did not match',
                status: httpStatus.CONFLICT,
            });
        }

        await User.findOneAndUpdate(
            {
                _id: user._id,
                'sessions.refresh_token': refreshToken,
            },
            {$pull: {sessions: {refresh_token: refreshToken}}}
        );

        return res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
        return next(error);
    }
};


/**
 * Refresh token function to get new access token
 * @public
 */
exports.refreshToken = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;

        const user = await User.findOne({
            sessions: {
                $elemMatch: {
                    is_active: true,
                    refresh_token: refreshToken,
                },
            },
        });

        if (!user) {
            throw new Error({
                message: 'Refresh token did not match',
                status: httpStatus.CONFLICT,
            });
        }
        const refreshTokenKey = uuidv4() + user._id;

        await User.updateOne(
            {
                _id: user._id,
                'sessions.refresh_token': refreshToken,
            },
            {
                'sessions.$.refresh_token': refreshTokenKey,
                'sessions.$.updatedAt': dayjs().valueOf(),
            }
        );

        const expiresIn = dayjs()
            .add(jwtExpirationInterval, 'minute')
            .valueOf();

        res.set('authorization', user.token());
        res.set('x-refresh-token', refreshTokenKey);
        res.set('x-token-expiry-time', expiresIn);

        return res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
        return next(error);
    }
};

/**
 * Login with an existing user
 * @public
 */
exports.login = async (req, res, next) => {
    try {
        const {
            email, password, clientType, deviceToken,
        } = req.body;
        const user = await User.findOne(
            {email},
            {
                _id: 1,
                email: 1,
                firstName: 1,
                lastName: 1,
                sessions: 1,
                password: 1,
            }
        );

        if (!user) {
            throw new Error({
                message: 'Account not found',
                status: httpStatus.NOT_FOUND,
            });
        }
        const passwordMatches = await user.passwordMatches(password);

        if (!passwordMatches) {
            throw new Error({
                message: 'Credentials did not match',
                status: httpStatus.CONFLICT,
            });
        }

        const token = await generateTokenResponse(user, {
            client_type: clientType,
            device_token: deviceToken,
        });

        res.set('authorization', token.accessToken);
        res.set('x-refresh-token', token.refreshToken);
        res.set('x-token-expiry-time', token.expiresIn);
        res.status(httpStatus.OK);

        return res.json(user.transform());
    } catch (error) {
        return next(error);
    }
};


/**
 * Creates a new user if valid details
 * @public
 */

// eslint-disable-next-line consistent-return
exports.register = async (req, res, next) => {
    try {
        const {
            firstName, lastName, email, password, clientType, deviceToken
        } = req.body;

        const isEmailExists = await User.findOne({email});

        if (isEmailExists) {
            throw new Error({
                message: 'Email address is already exists.',
                status: httpStatus.CONFLICT,
            });
        }

        const user = await new User({
            email,
            firstName: firstName,
            lastName: lastName,
            password
        }).save();
        const token = await generateTokenResponse(user, {
            client_type: clientType,
            device_token: deviceToken,
        });
        res.set('authorization', token.accessToken);
        res.set('x-refresh-token', token.refreshToken);
        res.set('x-token-expiry-time', token.expiresIn);
        res.status(httpStatus.CREATED);
        return res.json(user.transform());

    } catch (error) {
        return next(error);
    }
};

/**
 * Change Password
 * @public
 */
exports.changePassword = async (req, res, next) => {
    try {
        const {
            body: {
                password, oldPassword,
            },
            user: {_id: userId},
        } = req;

        const query = {_id: userId};
        const user = await User.findOne(query);
        const isPasswordMatches = await user.passwordMatches(oldPassword);
        const isSamePassword = await user.passwordMatches(password);

        if (!isPasswordMatches) {
            throw new Error({
                message: 'Old password does not matched.',
                status: httpStatus.CONFLICT,
            });
        }

        if (isSamePassword) {
            throw new Error({
                message: 'New password can not same as old password.',
                status: httpStatus.CONFLICT,
            });
        }

        const rounds = env === 'test' ? 1 : 10;
        const hash = await bcrypt.hash(password, rounds);

        await User.findOneAndUpdate({_id: user._id}, {password: hash});

        return res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
        return next(error);
    }
};

/**
 * Add new learned word to user profile
 * @public
 */
exports.addWord = async (req, res, next) => {
    try {
        const {word, topic} = req.body;
        const {user} = req;
        const searchWord = await User.find({
            _id: req.user._id,
            'learnedWords.word': word,
            'learnedWords.topic': topic
        }).exec();
        if (searchWord.length > 0) {
            throw new Error({
                message: 'Word already exist.',
                status: httpStatus.CONFLICT,
            });
        } else {

            const updatedUser = await User.findOneAndUpdate(
                {_id: user._id},
                {
                    $push: {
                        "learnedWords": {
                            word,
                            topic
                        }
                    }
                }, {new: true}).exec();

            const result = await this.getTopicProcess(topic, updatedUser);
            return res.json(result);
        }
    } catch (error) {
        return next(error);
    }
};
exports.getTopicProcess = async (topic, user) => {
    const total = await Lesson.countDocuments({topic}).exec();
    const learnedWordsFilter = user.learnedWords ? user.learnedWords.filter(w => w.topic === topic) : [];
    const learnedCount = learnedWordsFilter.length || 0;
    const progress = ((learnedCount / total) * 100).toFixed(2);
    return {
        topic,
        progress
    }
};
/**
 * Get progress of user
 * @public
 */
exports.getProgress = async (req, res, next) => {
    try {
        const {topic} = req.query;
        let topics = Lesson.topics;
        if (topic && !topics.includes(topic)) {
            throw new Error({
                message: 'Topic is not valid.',
                status: httpStatus.CONFLICT,
            });
        }
        if (topic) {
            topics = [topic];
        }
        const results = await Promise.all(topics.map(async (t) => {
            return this.getTopicProcess(t, req.user);
        }));
        res.json(results);
    } catch (error) {
        return next(error);
    }
};