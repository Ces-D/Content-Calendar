const router = require("express").Router();
const passport = require("passport");

const { protectedAccess } = require("../platforms/users");

router.get("/authorize/", protectedAccess, passport.authenticate("twitter"));

router.get("/authorize/callback/", protectedAccess, (req, res) => {
    console.log("Hello From Twitter callback");
    console.log("Session:", req.session);
    console.log("User: ", req.user); // Without passport this is undefined
    console.log("Cred ", req.credentials);
    res.json({ message: "Hello" });
});


 // TODO: Place the following between protectedAccess and (req, res)

 /* passport.authenticate("twitter")*/
module.exports = router;
