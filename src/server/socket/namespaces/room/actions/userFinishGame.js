const roomRepository = require('../../../repositories/roomRepository');
const playerRepository = require('../../../repositories/playerRepository');
const {notifyPlayer} = require('../../../services/notifyService');
const {OPPONENT_FINISH_GAME} = require('../actions/types');

module.exports = async (io, socket) => {
    const me = await playerRepository.getPlayerBySocketIdAndRoom(socket.id, socket.room.id);
    me.finish();
    await me.save();
    await notifyPlayer(socket, OPPONENT_FINISH_GAME, undefined, socket.opponent);

    const room = await roomRepository.getRoomById(me.roomId);
    room.endGame();
    await room.save();
};