const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const User = require("../models/User");

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET_KEY,
            callbackUrl: "http:127.0.0.1/api/twitter/authorize/callback",
        },
        async (AccessToken, AccessTokenSecret, profile, done) => {
            console.log("Token ", AccessToken);
            console.log("Token Secret ", AccessTokenSecret);
            console.log("Profile ", profile);
            // return done(null, profile);
        }
    )
);

module.exports = passport;
