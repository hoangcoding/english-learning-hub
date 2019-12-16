const roomRepository = require('../../../repositories/roomRepository');
const playerRepository = require('../../../repositories/playerRepository');
const {notifyPlayer, notifyMe} = require('../../../services/notifyService');
const {OPPONENT_READY,START_GAME } = require('./types');

module.exports = async (io, socket) => {
    const me = await playerRepository.getPlayerBySocketIdAndRoom(socket.id, socket.room.id);
    me.set('readyToPlay', true);
    await me.save();


    await notifyPlayer(socket, OPPONENT_READY, undefined, socket.opponent);

    const room = await roomRepository.getRoomById(me.roomId);
    if (room.isAllPlayersReadyToPlay()) {
        room.startGame();
        await room.save();

        await Promise.all(room.getPlayers().map(async (pl) => {
            await pl.startGame();
        }));
        await notifyMe(socket, START_GAME, '');
        await notifyPlayer(socket, START_GAME, '', socket.opponent);

    }
};