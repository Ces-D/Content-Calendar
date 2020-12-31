const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const User = require("../models/User");

//TODO: https://scotch.io/tutorials/easy-node-authentication-twitter

passport.serializeUser((user, done) => {});

passport.deserializeUser((user, done) => {});

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET_KEY,
            callbackUrl: "/api/twitter/authorize/callback",
        },
        async (token, tokenSecret, profile, done) => {
            console.log("Token ", token);
            console.log("Token Secret ", tokenSecret);
            console.log("Profile ", profile);
        }
    )
);

module.exports = passport;
