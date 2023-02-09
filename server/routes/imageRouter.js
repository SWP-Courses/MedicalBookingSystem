const express = require("express");
const bodyParser = require("body-parser");
const imageRouter = express.Router();

imageRouter.use(bodyParser.json());

imageRouter
    .route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "json/plain");
        next();
    })
imageRouter.route("/:id")
    .get()


module.exports = imageRouter;
