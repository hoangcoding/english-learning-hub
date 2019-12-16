const { GAME_ERROR, CREATE_GAME_SUCCESS } = require("./types");
const roomRepository = require("../../../repositories/roomRepository");
const playerRepository = require("../../../repositories/playerRepository");

const { notifyMe } = require("../../../services/notifyService");

module.exports = async (io, socket, payload) => {
  const { code, name } = payload;
  const room = await roomRepository.getRoomByCode(code);
  if (!room) {
    const newRoom = await roomRepository.createRoom(code);
    const player = await playerRepository.createPlayer(socket.id, name);
    await newRoom.addPlayer(player);
    await newRoom.save();
    await notifyMe(socket, CREATE_GAME_SUCCESS, newRoom.code);
    return newRoom;
  } else {
    await notifyMe(socket, GAME_ERROR, "Room already exist, Please try again");
  }
  return room;
};
