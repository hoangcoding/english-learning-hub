const mainChannelKey = 'room';

const notifyMe = (socket, action, data) => {
    console.log(`SERVER NOTIFY ME: ${JSON.stringify({type: action })}`);
    return socket.emit('action', { type: action, payload: data });
};
const notifyPlayer = (socket, action, data, player) => {
    console.log(`SERVER NOTIFY OPPONENT: ${JSON.stringify({type: action })}`);
    return socket.broadcast.to(player).emit('action', { type: action, payload: data });
};
module.exports = {
    notifyMe,
    notifyPlayer,
};