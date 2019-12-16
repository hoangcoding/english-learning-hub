/* eslint-disable no-invalid-this */
const mongoose = require('mongoose');
const statuses = {
    IN_PROCESS: 'IN_PROCESS',
    PAUSE: 'PAUSE',
    WAIT_PLAYERS: 'WAIT_PLAYERS',
    FINISHED: 'FINISHED',
};

const RoomSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RoomPlayer' }],
    status: {
        type: String,
        enum: Object.values(statuses),
        default: statuses.WAIT_PLAYERS,
    },
});
RoomSchema.methods.addPlayer = async function addPlayer(player) {
    if (this.players.map(p => p.id).includes(player.id)) {
        return;
    }

    this.players.push(player);
    await player.setRoom(this.id).save();
    return Promise.resolve(this);
};

RoomSchema.methods.removePlayer = async function removePlayer(playerId) {
    this.players = this.players.filter(item => item.id !== playerId);
    return this;
};

RoomSchema.methods.getPlayers = function getPlayers() {
    return this.players;
};
RoomSchema.methods.startGame = function startGame() {
    this.status = statuses.IN_PROCESS;
    return this;
};
RoomSchema.methods.pauseGame = function pauseGame() {
    this.status = statuses.PAUSE;
    return this;
};
RoomSchema.methods.endGame = function endGame() {
    this.status = statuses.FINISHED;
    return this;
};

RoomSchema.methods.isAllPlayersReadyToPlay = function isAllPlayersReadyToPlay() {
    if (!this.players.length) {
        return false;
    }
    return this.players.every(player => player.readyToPlay);
};

const model = mongoose.model('GameRoom', RoomSchema);

model.statuses = Object.freeze(statuses);

module.exports = model;