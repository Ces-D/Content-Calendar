const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("../utils/errors");

function protectedAccess(req, res, next) {
    if (!req.session.CalendarCredentials) {
        next(new AuthorizationError("User Not Authorized"));
    }

    try {
        const verified = jwt.verify(
            req.session.CalendarCredentials,
            process.env.JWT_SECRET_KEY
        );
        req.credentials = verified;
        next();
    } catch (error) {
        next(new AuthorizationError("User Not Verified"));
    }
}

function generateToken(id, displayName) {
    return jwt.sign(
        {
            _id: id,
            displayName: displayName,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );
}

module.exports = { protectedAccess, generateToken };
