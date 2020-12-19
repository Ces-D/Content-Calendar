require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const userApi = require("./api/users");

const mongoose = require("mongoose");

const app = express();

// Model
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGO_URL, options);

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/user", userApi);

module.exports = app;
