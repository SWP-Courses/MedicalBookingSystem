const Room = require("../models/room");

const getEmptyRoom = async (req, res) => {
    try {
        const room = await Room.find();
        res.status(200).json({ room });
    } catch (error) {
        console.log(error);
    }
}

const createRoom = async (req, res) => {
    try {
        const { room } = await req.body;
        if (!room) {
            res.status(400);
            throw new Error("All field not be empty!");
        }


        const roomSave = await Room.create({
            room
        });
        res.status(200).json(roomSave);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createRoom, getEmptyRoom }