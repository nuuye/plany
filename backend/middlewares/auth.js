//auth.js file in middleware directory
const jwt = require("jsonwebtoken");
const user = require("../models/user");

//middleware qui vérifiant la validité du token JWT
module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("Authorization header missing");
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ error: error.message });
    }
};
