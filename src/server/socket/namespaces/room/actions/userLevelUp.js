const roomRepository = require('../../../repositories/roomRepository');
const playerRepository = require('../../../repositories/playerRepository');
const {notifyPlayer} = require('../../../services/notifyService');
const {OPPONENT_LEVEL_UP} = require('../actions/types');

module.exports = async (io, socket) => {
    const me = await playerRepository.getPlayerBySocketIdAndRoom(socket.id, socket.room.id);
    me.increaseLevel();
    await me.save();
    await notifyPlayer(socket, OPPONENT_LEVEL_UP, undefined, socket.opponent);
};