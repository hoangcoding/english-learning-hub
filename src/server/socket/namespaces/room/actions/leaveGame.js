const roomRepository = require('../../../repositories/roomRepository');
const playerRepository = require('../../../repositories/playerRepository');
const Room = require('../../../models/Room');
const {notifyPlayer} = require('../../../services/notifyService');
const {PLAYER_WIN} = require('../actions/types');

module.exports = async (io, socket, room) => {
    const newRoom = await roomRepository.getRoomByCode(room.code);
    if(!newRoom) return;
    const {players} = newRoom;
    if(players.length === 1) {
        await roomRepository.removeRoomByCode(newRoom.code);
    } else {
        if(newRoom.status !== Room.statuses.WAIT_PLAYERS && newRoom.status !== Room.statuses.FINISHED) {
            const remainPlayers = newRoom.players.filter(p => p.socketId !== socket.id);
            await Promise.all(remainPlayers.map(async (player) => {
                await notifyPlayer(socket, PLAYER_WIN, '' , player.socketId);
            }));
        }
        const player = await playerRepository.getPlayerBySocketIdAndRoom(socket.id, newRoom.id);
        if(player) await room.removePlayer(player.id);
    }
    await playerRepository.removePlayerBySocketIdAndRoom(socket.id, room.id);
};