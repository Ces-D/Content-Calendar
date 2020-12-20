const { body, header } = require("express-validator");
const jwt = require("jsonwebtoken");

const loginValidators = [
    body("email")
        .isEmail()
        .withMessage("Must Be A Valid Email")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Must Be 8 Characters Or More")
        .matches("[0-9]")
        .withMessage("Must Contain Numbers")
        .matches("[A-Z]")
        .withMessage("Must Contain Capital Letters"),
];

const registerValidators = [
    body("email")
        .isEmail()
        .withMessage("Must Be A Valid Email")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Must Be 8 Characters Or More")
        .matches("[0-9]")
        .withMessage("Must Contain Numbers")
        .matches("[A-Z]")
        .withMessage("Must Contain Capital Letters"),
    body("displayName")
        .isLength({ min: 2 })
        .withMessage("Must Be At Least 2 Characters Long"),
];

const updateValidators = [
    body("email").custom((email) => {
        if (email) {
            email
                .isEmail()
                .withMessage("Must Be A Valid Email")
                .normalizeEmail();
        }
        return true;
    }),
    body("password").custom((password) => {
        if (password) {
            password
                .isLength({ min: 8 })
                .withMessage("Must Be 8 Characters Or More")
                .matches("[0-9]")
                .withMessage("Must Contain Numbers")
                .matches("[A-Z]")
                .withMessage("Must Contain Capital Letters");
        }
        return true;
    }),
    body("displayName").custom((displayName) => {
        if (displayName) {
            displayName
                .notEmpty()
                .withMessage("Cannot Be Empty")
                .isLength({ min: 2 })
                .withMessage("Must Be At Least 2 Character Long");
        }
        return true;
    }),
];

module.exports = { loginValidators, registerValidators, updateValidators };
