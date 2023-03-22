const UserModel = require("../models/User");
const Blog = require("../models/blog");
const Medicine = require("../models/medicine");
const BookedService = require("../models/BookedService");
const Service = require("../models/service");

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

const serviceAnalysis = async (req, res) => {
    try {
        const listService = await Service.find().select("_id name");
        const formatServiceList = listService.reduce((acc, curr) => {
            return {
                ...acc,
                [curr._id.toString()]: {
                    name: curr.name,
                    quantity: 0
                }
            }
        }, {});

        let total = 0;
        for (const key in formatServiceList) {
            const count = await BookedService.find({ "services.service_id": key }).count();
            formatServiceList[key].quantity = count;
            total += count;
        }
        res.status(200).json({ formatServiceList, total });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
}

module.exports = { getAnalyticsOfSystem, serviceAnalysis }