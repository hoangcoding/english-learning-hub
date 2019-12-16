const roomRepository = require('../../../repositories/roomRepository');
const playerRepository = require('../../../repositories/playerRepository');
const {GAME_ERROR, JOIN_GAME_SUCCESS} = require('./types');
const {notifyMe} = require('../../../services/notifyService');

module.exports = async (io, socket, payload) => {
    const {code, name} = payload;
    const room = await roomRepository.getRoomByCode(code);
    if(!room) {
        await notifyMe(socket, GAME_ERROR, 'Room does not exist, Please try again');
    }else if(room.players.length >= 2) {
        if(room.players.length > 2) await roomRepository.removeRoomByCode(room.code);
        await notifyMe(socket, GAME_ERROR, 'Room is full, Please try again');
    } else {
        const player = await playerRepository.createPlayer(socket.id, name);
        await room.addPlayer(player);
        await room.save();
        await notifyMe(socket, JOIN_GAME_SUCCESS, room.code);
        return room;
    }
};