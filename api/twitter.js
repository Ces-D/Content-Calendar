const router = require("express").Router();
const passport = require("passport");

const { protectedAccess } = require("../platforms/users");

router.get("/authorize/", passport.authenticate("twitter"));

router.get(
    "/authorize/callback/",
    passport.authenticate("twitter", {
        failureMessage: true,
        failureFlash:true,
        authInfo: true,
        // failureRedirect: "/api/user/login",
    }),
    (req, res) => [res.json({ user: "Twitter" })]
);

module.exports = router;
