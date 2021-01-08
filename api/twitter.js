const router = require("express").Router();
const passport = require("passport");

const { protectedAccess } = require("../platforms/users");

router.get("/authorize/", protectedAccess, passport.authenticate("twitter"));

router.get(
    "/authorize/callback/",
    protectedAccess,
    passport.authenticate("twitter", {
        failureMessage: true,
        failureFlash: true,
        // successRedirect: "/api/user/",
        // failureRedirect: "/api/user/login",
    }),
    (req, res) => {
        console.log("Hello");
        console.log("Session:", req.session);
        console.log("User: ", req.user);
        console.log("Cred ", req.cred);
        res.json({ message: "Hello" });
    }
);

module.exports = router;
