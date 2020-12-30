const router = require("express").Router();
const passport = require("passport");

const { protectedAccess } = require("../platforms/users");
// TODO: reuqires sesion support

router.get("/authorize/", passport.authenticate("twitter"));

router.get(
    "/authorize/callback",
    passport.authenticate("twitter", { failWithError: true }),
    (req, res, next) => {
        console.log(req);
    }
);

module.exports = router;
