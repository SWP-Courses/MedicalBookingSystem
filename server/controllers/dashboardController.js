const UserModel = require("../models/User");
const Blog = require("../models/blog");
const Medicine = require("../models/medicine");

const getAnalyticsOfSystem = async (req, res) => {
    try {
        const doctorCount = await UserModel.find({ role_code: "R2", status: true }).count();
        const userAccountCount = await UserModel.find({ role_code: "R3", status: true }).count();
        const blogCount = await Blog.find().count();
        const medicineCount = await Medicine.find().count();
        res.status(200).json({ doctorCount, userAccountCount, blogCount, medicineCount });

    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
}

module.exports = { getAnalyticsOfSystem }