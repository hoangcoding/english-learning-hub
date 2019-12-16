const Player = require('../models/Player');

module.exports = {
    async createPlayer(socketId, name) {
        let player = await Player.findOne({socketId});
        if(!player) {
            player = new Player({
                socketId, name
            });
            return player.save();
        }
        return player;
    },
    async getPlayerBySocketIdAndRoom(socketId, room) {
        return Player.findOne({ socketId, room });
    },
    async removePlayerBySocketIdAndRoom(socketId, room) {
        return Player.deleteOne({ socketId, room });
    },
};