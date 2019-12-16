
const {
    createGame,
    leaveGame,
    joinGame,
    checkEnoughPlayers,
    userReadyToPlay,
    userPauseGame,
    userResumeGame,
    userIncreaseMatchCount,
    userFinishGame,
    userLevelUp
} = require('./actions');

const roomRepository = require('../../repositories/roomRepository');

module.exports = (io) => io.of('/room').on('connection', function(socket) {
    // Join a chatroom
    socket.on('join', async (payload) => {
        socket.room = await joinGame(io, socket, payload);
        if(socket.room) {
            await checkEnoughPlayers(io, socket);
        }
    });
    socket.on('create', async (payload) => {
        socket.room = await createGame(io, socket, payload);
    });
    socket.on('player.ready', async (opponentSocketId) => {
        socket.opponent = opponentSocketId;
        await userReadyToPlay(io, socket);
    });
    socket.on('player.pause', async () => {
        await userPauseGame(io, socket);
    });
    socket.on('player.resume', async () => {
        await userResumeGame(io, socket);
    });
    socket.on('player.increaseMatchCount', async () => {
        await userIncreaseMatchCount(io, socket);
    });
    socket.on('player.levelUp', async () => {
        await userLevelUp(io, socket);
    });
    socket.on('player.finishGame', async () => {
        await userFinishGame(io, socket);
    });
    // When a socket exits
    socket.on('disconnect', async() => {
        const {room} = socket;
        if(room) {
           await leaveGame(io, socket, room);
        }
    });
});