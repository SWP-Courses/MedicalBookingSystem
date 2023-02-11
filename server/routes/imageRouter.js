const express = require("express");
const bodyParser = require("body-parser");
const imageRouter = express.Router();
const { getImageController } = require("../controllers/imageController");

imageRouter.use(bodyParser.json());

imageRouter
    .route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "json/plain");
        next();
    })
imageRouter.route("/:filename")
    .get(getImageController)


module.exports = imageRouter;
