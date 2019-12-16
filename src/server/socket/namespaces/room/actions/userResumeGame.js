const roomRepository = require('../../../repositories/roomRepository');
const Room = require('../../../models/Room');
const {notifyPlayer} = require('../../../services/notifyService');
const {START_GAME} = require('../actions/types');

module.exports = async (io, socket) => {
    const room = await roomRepository.getRoomByCode(socket.room.code);
    if(room.status === Room.statuses.PAUSE) {
        room.startGame();
        await room.save();
       await notifyPlayer(socket, START_GAME, socket.id, socket.opponent);
    }
};