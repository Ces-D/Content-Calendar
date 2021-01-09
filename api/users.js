const router = require("express").Router();
const { validationResult } = require("express-validator");
const User = require("../models/User");
const {
    loginValidators,
    registerValidators,
    updateValidators,
} = require("../utils/userValidators");
const { protectedAccess } = require("../platforms/users");

// TODO: https://github.com/t1msh/node-oauth20-provider
// TODO: https://github.com/panva/node-oidc-provider

/* POST Login User */
router.post("/login/", loginValidators, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    // logic for logging in
    try {
        const token = await User.login({
            email: req.body.email,
            password: req.body.password,
        });
        // console.log("User: ", user);
        req.session.CalendarCredentials = token;
        console.log(req.session.CalendarCredentials)
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
            console.log(req.credentials._id);
            const updatedUser = await User.update({
                id: req.credentials._id,
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
    delete req.session.CalendarCredentials;
    res.json({ message: "User Logged Out" });
});

/* DELETE User */
router.delete("/delete/", protectedAccess, async (req, res, next) => {
    try {
        const userDeleted = await User.delete({ id: req.credentials._id });
        delete req.session.CalendarCredentials;
        res.json({ message: userDeleted });
    } catch (error) {
        res.json({ error: error });
    }
});

/* GET User Account */
router.get("/", protectedAccess, async (req, res, next) => {
    try {
        const user = await User.findById(req.credentials._id);
        res.json(user);
    } catch (error) {
        console.log(error)
        res.json({ error: error.message });
    }
});

module.exports = router;
