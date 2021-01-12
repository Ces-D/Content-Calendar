const { body, header, validationResult } = require("express-validator");
const { RequestError } = require("../utils/errors");

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
    body("email")
        .optional()
        .isEmail()
        .withMessage("Must Be A Valid Email")
        .normalizeEmail(),
    body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Must Be 8 Characters Or More")
        .matches("[0-9]")
        .withMessage("Must Contain Numbers")
        .matches("[A-Z]")
        .withMessage("Must Contain Capital Letters"),
    body("displayName")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Must Be At Least 2 Character Long"),
];

const validatorHandling = (req, res, next) => {
    const validatorErrors = validationResult(req);
    if (!validatorErrors.isEmpty()) {
        next(new RequestError(validatorErrors));
    }
    next();
};
module.exports = {
    loginValidators,
    registerValidators,
    updateValidators,
    validatorHandling,
};
