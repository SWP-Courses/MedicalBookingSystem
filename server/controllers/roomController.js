const Room = require("../models/room");
const UserModel = require("../models/User");
const getEmptyRoom = async (req, res) => {
    try {
        const doctor_id = req.params.id;
        const notEmpltyRoom = await UserModel.find({ role_code: "R2" }).select("room_id");
        let emptyRoomArr = [];
        for (const room of notEmpltyRoom) {
            if (doctor_id && room._id.toString() === doctor_id) continue;
            if (room.room_id) {
                emptyRoomArr.push(room.room_id.toString());
            }

        }
        // console.log(emptyRoomArr);
        const room = await Room.find({ _id: { $nin: emptyRoomArr } });
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