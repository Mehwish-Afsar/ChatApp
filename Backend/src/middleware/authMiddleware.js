const User = require("../models/User");
const ENV = require("../lib/env")
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" })
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" })
        }
        const user = await User.findById(decoded.userId)
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        req.user =user
        next()
    } catch (error) {
        console.log("Error in protect route Middleware", error)
        return res.status(500).json("Internal Server Error")

    }
}

module.exports = protectRoute