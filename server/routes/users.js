import express from "express";
var router = express.Router();
import UserModel from "../models/User.js";
import mongoose, { ObjectId } from "mongoose";

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // res.send("respond with a resource");

  try {
    const result = await UserModel.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "role_code",
          foreignField: "role_code",
          as: "role",
        },
      },
      {
        $match: {
          phone: "01234567890",
        },
      },
    ]);

    console.log(result[0].role[0].title);

    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
