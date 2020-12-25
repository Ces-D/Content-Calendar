const jwt = require("jsonwebtoken");

function protectedAccess(req, res, next) {
    // console.log(req.headers)
    const authToken =
        req.headers["authorization"] &&
        req.headers["authorization"].split(" ")[1];
    try {
        const verified = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.json({ error: error.message });
    }
}

function generateToken(id, displayName) {
    return jwt.sign(
        {
            _id: id,
            displayName: displayName,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "10h" }
    );
}

module.exports = { protectedAccess, generateToken };
