const {redis} 	= require('./../config');
const redisClient 	= require('redis').createClient;
const adapter = require('socket.io-redis');
const roomNameSpace = require('./namespaces/room');
const Room = require('./models/Room');

/**
 * Encapsulates all code for emitting and listening to socket events
 *
 */
const ioEvents = function(io) {

    // Room namespace
    roomNameSpace(io);
};


/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 *
 */
const init = function(server){

    const io = require('socket.io')(server);

    io.set('transports', ['polling', 'websocket']);
    // Using Redis
    let port = redis.client.port;
    let host = redis.client.host;
    let password = redis.client.password;
    let pubClient = redisClient(port, host, { auth_pass: password });
    let subClient = redisClient(port, host, { auth_pass: password, return_buffers: true, });
    io.adapter(adapter({ pubClient, subClient }));
    io.on('connection', client => {
        console.log('========== Socket Server connected ==========');
    });

/*    // Allow sockets to access session data
    io.use((socket, next) => {
        require('../session')(socket.request, {}, next);
    });*/

    // Define all Events
    ioEvents(io);

    // The server object will be then used to list to a port number
    return server;
};

module.exports = init;