require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(403);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        next();
    });
};

module.exports = {userAuth}