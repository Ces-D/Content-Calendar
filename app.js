require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const twitterSetup = require("./platforms/twitter");

const mongoose = require("mongoose");

const app = express();

// Model
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(console.log("Database Connected"));

// Passport
const trustProxy = false;
if (process.env.DYNO) {
    // Apps on heroku are behind a trusted proxy
    trustProxy = true;
}

passport.serializeUser(function (user, done) {
    console.log("Serializing");
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log("Deserializing");
    done(null, user);
});

// App Middle wares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false, // dotn save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            secret: process.env.SESSION_STORE_SECRET,
        }),
        cookie: { maxAge: 86400000, httpOnly: true }, //secure:true -- only for HHTPS websites && trustproxy == true
    })
);

app.use(passport.initialize());
app.use(passport.session());

// API
const userApi = require("./api/users");
const twitterApi = require("./api/twitter");

app.use("/api/user", userApi);
app.use("/api/twitter", twitterApi);

module.exports = app;
