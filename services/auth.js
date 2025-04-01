import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
    return jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
};

const generateRefreshToken = (id) => {
    return jwt.sign({id: id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
};

export const authService = {
    generateAccessToken,
    generateRefreshToken,
};