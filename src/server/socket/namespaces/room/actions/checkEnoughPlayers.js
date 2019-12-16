const roomRepository = require('../../../repositories/roomRepository');
const playerRepository = require('../../../repositories/playerRepository');
const {notifyPlayer, notifyMe} = require('../../../services/notifyService');
const {ENOUGH_PLAYERS} = require('../actions/types');

module.exports = async (io, socket) => {
    const {room} = socket;
    const {players} = room;
    if(players && players.length === 2) {
        const me = await playerRepository.getPlayerBySocketIdAndRoom(socket.id, room.id);
        if(players[0].socketId === me.socketId) {
            await notifyMe(socket, ENOUGH_PLAYERS, players[1]);
            await notifyPlayer(socket, ENOUGH_PLAYERS, players[0], players[1].socketId);
        }else {
            await notifyMe(socket, ENOUGH_PLAYERS, players[0]);
            await notifyPlayer(socket, ENOUGH_PLAYERS, players[1], players[0].socketId);
        }
    }
};