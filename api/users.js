const router = require("express").Router();
const { validationResult } = require("express-validator");
// TODO: https://gabrieleromanato.name/creating-and-managing-sessions-in-expressjs
const User = require("../models/User");
const {
    loginValidators,
    registerValidators,
    updateValidators,
} = require("../utils/userValidators");
const { protectedAccess } = require("../platforms/users");

/* POST Login User */
router.post("/login/", loginValidators, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    // logic for logging in
    try {
        const token = await User.login({
            email: req.body.email,
            password: req.body.password,
        });
        // console.log("User: ", user);
        res.session.user = { token: token };
        res.status(200).json({ message: "User Logged In" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/* POST Register User */
router.post("/register/", registerValidators, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    // logic for registering
    try {
        const newUser = await User.register({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
        });
        res.json({ message: "User Successfully Created" });
    } catch (error) {
        // console.log("error", error);
        res.json({ error: error.message });
    }
});

/* PUT Update User */
router.put(
    "/update/",
    protectedAccess,
    updateValidators,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.array());
        try {
            console.log(req.cred._id);
            const updatedUser = await User.update({
                id: req.cred._id,
                updateFields: req.body,
            });
            res.json(updatedUser);
        } catch (error) {
            res.json({ error: error.message });
        }
    }
);

/* POST Logout User */
router.post("/logout/", protectedAccess, async (req, res, next) => {
    delete req.session.user
    res.json({ message: "User Logged Out" });
});

/* DELETE User */
router.delete("/delete/", protectedAccess, async (req, res, next) => {
    try {
        const userDeleted = await User.delete({ id: req.cred._id });
        delete req.session.user
        res.json({ message: userDeleted });
    } catch (error) {
        res.json({ error: error });
    }
});

/* GET User Account */
router.get("/", protectedAccess, async (req, res, next) => {
    try {
        const user = User.findById({ id: req.cred._id });
        res.json(user);
    } catch (error) {
        res.json({ error: error });
    }
});

module.exports = router;
