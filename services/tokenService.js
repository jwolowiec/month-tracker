import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

export default class TokenService {
    generateAccessToken(user) {
        return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    };

    verifyAccessToken(accessToken) {
        return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    };

    generateRefreshToken(userId) {
        return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    };

    verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    };

    async expireOldRefreshToken(userId, deviceInfo) {
        await RefreshToken.updateOne({ userId, deviceInfo }, { expired: true });
    };

    async expireRefreshTokenByLogOut(refreshToken) {
        await RefreshToken.updateOne({token: refreshToken}, {expired: true});
    };

    async saveNewRefreshToken(userId, deviceInfo, refreshToken) {
        await RefreshToken.create({
            userId,
            token: refreshToken,
            deviceInfo
        });
    };

    findValidRefreshToken(refreshToken) {
        return RefreshToken.findOne({
            token: refreshToken,
            $or: [
                {expireTime: {$gte: new Date()}},
                {expired: false},
            ]
        }).populate("userId");
    };

    async removeAllExpiredRefreshTokens() {
        await RefreshToken.deleteMany({
            $or: [
                {expireTime: {$lt: new Date()}},
                {expired: true}
            ]
        });
    };

}