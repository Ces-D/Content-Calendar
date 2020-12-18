require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const api = require("./api");

const mongoose = require("mongoose");

const server = express();

// Model
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGO_URL, options);

server.use(helmet());
server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());

api(server);

module.exports = app;
