const router = require("express").Router();
const passport = require("passport");

const { protectedAccess } = require("../platforms/users");

router.get("/authorize/", protectedAccess, passport.authenticate("twitter"));

router.get(
    "/authorize/callback",
    passport.authenticate("twitter", {
        successRedirect: "/api/user/",
        failWithError: true,
    })
);

module.exports = router;
