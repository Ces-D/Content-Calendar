const jwt = require("jsonwebtoken");

async function protectedAccess(req, res, next) {
    console.log(req.headers)
    const authToken =
        req.headers["authorization"] &&
        req.headers["authorization"].split(" ")[1];
    try {
        const verified = await jwt.verify(
            authToken,
            process.env.JWT_SECRET_KEY
        );
        req.user = verified;
        next();
    } catch (error) {
        res.json({ error: error });
    }
}

module.exports = { protectedAccess };
