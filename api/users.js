const router = require("express").Router();
const User = require("../models/User");
const {
    loginValidators,
    registerValidators,
    updateValidators,
    validatorHandling,
} = require("../utils/userValidators");
const { protectedAccess } = require("../platforms/users");

/* POST Login User */
router.post(
    "/login/",
    loginValidators,
    validatorHandling,
    async (req, res, next) => {
        try {
            const token = await User.login({
                email: req.body.email,
                password: req.body.password,
            });
            // console.log("User: ", user);
            req.session.CalendarCredentials = token;
            res.send({ message: "User Logged In" });
        } catch (error) {
            next(error);
        }
    }
);

/* POST Register User */
router.post(
    "/register/",
    registerValidators,
    validatorHandling,
    async (req, res, next) => {
        try {
            const newUser = await User.register({
                email: req.body.email,
                password: req.body.password,
                displayName: req.body.displayName,
            });
            res.send({ message: "User Successfully Created" });
        } catch (error) {
            // console.log("error", error);
            next(error);
        }
    }
);

/* PUT Update User */
router.put(
    "/update/",
    protectedAccess,
    updateValidators,
    validatorHandling,
    async (req, res, next) => {
        try {
            console.log(req.credentials._id);
            const updatedUser = await User.update({
                id: req.credentials._id,
                updateFields: req.body,
            });
            res.send(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);

/* POST Logout User */
router.post("/logout/", protectedAccess, async (req, res, next) => {
    try {
        delete req.session.CalendarCredentials;
        res.send({ message: "User Logged Out" });
    } catch (error) {
        next(error);
    }
});

/* DELETE User */
router.delete("/delete/", protectedAccess, async (req, res, next) => {
    try {
        await User.delete({ id: req.credentials._id });
        delete req.session.CalendarCredentials;
        console.log(req.session);
        res.send({ message: "User Deleted" });
    } catch (error) {
        next(error);
    }
});

/* GET User Account */
router.get("/", protectedAccess, async (req, res, next) => {
    try {
        const user = await User.findById(req.credentials._id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
