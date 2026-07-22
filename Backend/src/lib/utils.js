const jwt = require("jsonwebtoken");
const ENV = require("../lib/env")


const generateToken = (userId, res) => {
    const token = jwt.sign(
        { userId },
        ENV.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV.NODE_ENV === "production",
    });

    return token;
};

module.exports = generateToken;
