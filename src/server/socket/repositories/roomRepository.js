const Room = require('../models/Room');
const Player = require('../models/Player');

module.exports = {
    async getRoomByCode(code) {
        return Room
            .findOne({code})
            .populate(['players']);
    },
    async getRoomById(roomId) {
        return Room
            .findById(roomId)
            .populate(['players']);
    },
    async createRoom(code) {
        const room = await (new Room({ code })).save();

        return Room.findById(room.id);
    },
    async removeRoomByCode(code) {
        return Room.deleteOne({ code });
    },
};