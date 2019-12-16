require('dotenv').config();

let config = {
    env: process.env.NODE_ENV,
    jwtExpirationInterval: 60 * 12,
    jwtSecret: process.env.JWT_SECRET || 'F3Icioedfio3iof32i99fu9JF9jd2kdjkofjo999i',
    mongo: { uri: process.env.MONGO_URI || 'mongodb+srv://user:password@123@cluster0-s56zw.mongodb.net/test?retryWrites=true&w=majority' },
    port: process.env.SERVER_PORT || 5001,
    redis: {
        client: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            lazyConnect: true,
        },
        keys: {
        }
    },
};

module.exports = config;