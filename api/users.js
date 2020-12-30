const router = require("express").Router()
const { validationResult } = require("express-validator");

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
        const user = await User.login({
            email: req.body.email,
            password: req.body.password,
        });
        // console.log("User: ", user);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
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
        res.json(newUser);
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
            const updatedUser = await User.update({
                id: req.user._id,
                updateFields: req.body,
            });
            res.json(updatedUser);
        } catch (error) {
            res.json({ error: error.message });
        }
    }
);

/* DELETE User */
router.delete("/delete/", protectedAccess, async (req, res, next) => {
    try {
        const userDeleted = await User.delete({ id: req.user._id });
        res.json({ message: userDeleted });
    } catch (error) {
        res.json({ error: error });
    }
});

/* GET User Account */
router.get("/", protectedAccess, async (req, res, next) => {
    try {
        const user = User.findById({ id: req.user._id });
        res.json(user);
    } catch (error) {
        res.json({ error: error });
    }
});

module.exports = router;
