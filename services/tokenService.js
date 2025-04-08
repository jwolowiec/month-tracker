import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

export default class TokenService {
    constructor(user, deviceInfo) {
        this.user = user;
        this.deviceInfo = deviceInfo;
    }

    generateAccessToken = (user) => {
        return jwt.sign({ user: this.user || user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    };

    verifyAccessToken = (accessToken) => {
        return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    };

    generateRefreshToken = () => {
        return jwt.sign({ id: this.user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    };

    verifyRefreshToken = (refreshToken) => {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    };

    expireOldRefreshToken = async () => {
        await RefreshToken.updateOne({ userId: this.user.id, deviceInfo: this.deviceInfo }, { expired: true });
    };

    expireRefreshTokenByLogOut = async (refreshToken) => {
        await RefreshToken.updateOne({token: refreshToken}, {expired: true});
    };

    saveNewRefreshToken = async (refreshToken) => {
        await RefreshToken.create({
            userId: this.user._id,
            token: refreshToken,
            deviceInfo: this.deviceInfo
        });
    };

    findValidRefreshToken = (refreshToken) => {
        return RefreshToken.findOne({
            token: refreshToken,
            $or: [
                {expireTime: {$gte: new Date()}},
                {expired: false},
            ]
        }).populate("userId");
    };


}