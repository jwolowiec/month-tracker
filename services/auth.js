import jwt from "jsonwebtoken";

const generateAccessToken = (id) => {
    return jwt.sign({user: id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60 * 60});
};

export const authService = {
    generateAccessToken
};