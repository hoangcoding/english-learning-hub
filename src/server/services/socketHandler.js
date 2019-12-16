module.exports = io => async (socket, next) => {
    console.debug(`User connected: ${socket.id}`);
    console.debug(`Token: ${socket.handshake.query.token}`);

};