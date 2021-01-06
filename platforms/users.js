const jwt = require("jsonwebtoken");

function protectedAccess(req, res, next) {
    if (!req.session.user) {
        res.json({ error: "User Not Logged In" });
    }

    try {
        const verified = jwt.verify(
            req.session.user.token,
            process.env.JWT_SECRET_KEY
        );
        req.cred = verified;
        next();
    } catch (error) {
        res.json({ error: error });
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
