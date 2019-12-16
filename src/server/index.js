Promise = require('bluebird');
const app = require('./server');

const server = require('http').Server(app);


require('./socket')(server);

/*global.io = io;*/

const {
    port, env, redis
} = require('./config');
const database = require('./bootstrap/database');

// Connect mongoDB server
database.connect();



// Connect Socket.IO
app.use((req, res, next) => {
    res.io = io;
    next();
});


server.listen(port, () => {
    console.info(`Server started on port ${port} (${env})`);
});

module.exports = server;