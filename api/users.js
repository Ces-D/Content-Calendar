const express = require("express");
const { validationResult } = require("express-validators");
const router = express.Router();

const UserModel = require("../models/User");
const {
    signInOrSignUpValidators,
    updateValidators,
} = require("../utils/userValidators");

/* POST Login User */
router.post("/login/", signInOrSignUpValidators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    // logic for logging in
});

/* POST Register User */
router.post("/register/", signInOrSignUpValidators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    // logic for registering
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
