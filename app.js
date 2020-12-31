require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const twitterSetup = require("./platforms/twitter")

const mongoose = require("mongoose");

const app = express();

// Model
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};
mongoose
    .connect(process.env.MONGO_URL, options)
    .then(console.log("Database Connected"));

// Passport
const trustProxy = false;
if (process.env.DYNO) {
    // Apps on heroku are behind a trusted proxy
    trustProxy = true;
}

app.use(helmet());
app.use(cors({ credentials: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// API
const userApi = require("./api/users");
const twitterApi = require("./api/twitter");

app.use("/api/user", userApi);
app.use("/api/twitter", twitterApi);

module.exports = app;
