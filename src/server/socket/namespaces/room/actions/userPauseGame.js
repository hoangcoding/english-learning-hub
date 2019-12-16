const roomRepository = require('../../../repositories/roomRepository');
const Room = require('../../../models/Room');

const playerRepository = require('../../../repositories/playerRepository');
const {notifyPlayer} = require('../../../services/notifyService');
const {PAUSE_GAME} = require('../actions/types');

module.exports = async (io, socket) => {
    const room = await roomRepository.getRoomByCode(socket.room.code);
    if(room.status === Room.statuses.IN_PROCESS) {
        room.pauseGame();
        await room.save();
        await notifyPlayer(socket, PAUSE_GAME, socket.id, socket.opponent);
    }
};