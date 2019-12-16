const roomRepository = require('../../../repositories/roomRepository');
const playerRepository = require('../../../repositories/playerRepository');
const {notifyPlayer} = require('../../../services/notifyService');
const {OPPONENT_INCREASE_MATCH_COUNT} = require('../actions/types');

module.exports = async (io, socket) => {
    const me = await playerRepository.getPlayerBySocketIdAndRoom(socket.id, socket.room.id);
    me.increaseMatchCount();
    await me.save();
    await notifyPlayer(socket, OPPONENT_INCREASE_MATCH_COUNT, undefined, socket.opponent);
};