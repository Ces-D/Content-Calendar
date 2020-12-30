require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

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

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET_KEY,
            callbackURL: "https://localhost:5000/api/twitter/authorize/callback",
            proxy: trustProxy,
        },
        function (token, tokenSecret, profile, cb) {
            console.log(
                "Passport Twitter \n",
                token,
                "\n",
                tokenSecret,
                "\n",
                profile,
                "\n",
                cb
            );
            return cb(token, tokenSecret);
        }
    )
);

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API
const userApi = require("./api/users");
const twitterApi = require("./api/twitter");

app.use("/api/user", userApi);
app.use("/api/twitter", twitterApi);

module.exports = app;
