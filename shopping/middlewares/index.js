require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(403);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        next();
    });
};

const extractUserId=(req,res)=>{
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(403);
    const token = authHeader.split(" ")[1];
    let userId = null;
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        // if (err) return res.sendStatus(403); //invalid token
        if(decoded){
            userId = decoded.id;
        }
    });

    return userId;

}


const extractUserEmail=(req,res)=>{
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(403);
    const token = authHeader.split(" ")[1];
    let userEmail = null;
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        // if (err) return res.sendStatus(403); //invalid token
        if(decoded){
            userEmail = decoded.email;
        }
    });

    return userEmail;

}

module.exports = {userAuth,extractUserId,extractUserEmail}