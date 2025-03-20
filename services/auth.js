import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
    return jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
};

export const authService = {
    generateAccessToken
};