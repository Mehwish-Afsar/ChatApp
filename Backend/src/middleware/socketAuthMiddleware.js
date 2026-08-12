const jwt = require("jsonwebtoken");
const user = require("../models/User.js")
const ENV = require("../lib/env.js");
const User = require("../models/User.js");

const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startWith("jwt="))
            ?.split("=")[1];
        if (!token) {
            console.log("Socket Connection rejected: No token provided")
            return next(new Error("Unauthorized - No Token provided"))
        }

        // Verify the token
        const decoded = jwt.verify(token, ENV.JWT_SECRET)
        if (!decoded) {
            console.log("Socket Connection rejected - Invalid Token")
            return next(new Error("Unauthorized - Invalid Token"))
        }

        // Find the user from db
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            console.log("Socket Connection rejected - User not Found")
            return next(new Error("Unauthorized - User not Found"))
        }

        socket.user = user
        socket.userId = user._id.toString()

        console.log(`Socket authenticated for user: ${user.fullName} (${user._id}) `)

        next()

    } catch (error) {
        console.log("Error in socket authentication:", error.message)
        next (new Error("Unauthorized - Authentication Failed"))

    }

}

module.exports = socketAuthMiddleware