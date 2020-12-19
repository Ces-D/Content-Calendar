const express = require("express");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const {
    signInOrSignUpValidators,
    updateValidators,
} = require("../utils/userValidators");

const router = express.Router();

/* POST Login User */
router.post("/login/", signInOrSignUpValidators, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    // logic for logging in
    try {
        const user = await User.login(req.body.email, req.body.password);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

/* POST Register User */
router.post("/register/", signInOrSignUpValidators, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    // logic for registering
    try {
        const newUser = await User.register(
            req.body.email,
            req.body.password,
            req.body.displayName
        );
        res.json(newUser);
    } catch (error) {
        res.json(error);
    }
});

/* PUT Update User */
router.put("/update/", updateValidators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    // logic for updating
});

/* DELETE User */
router.delete("/delete/", (req, res, next) => {
    // logic for deleting
});

module.exports = router;
