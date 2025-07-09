import {tokenService, userService} from "../services.js";

export default class AuthService{
    async login(mail, password, deviceInfo) {
        const user = await userService.findUserByMail(mail, deviceInfo);

        if (!user) {
            const error = new Error('User not found');
            error.status = 401;
            throw error;
        }

        const valid = await userService.checkPassword(password, user.password);

        if (!valid) {
            const error = new Error('Invalid password');
            error.status = 401;
            throw error;
        }

        await tokenService.expireOldRefreshToken(user._id, deviceInfo);

        const refreshToken = tokenService.generateRefreshToken(user._id);

        await tokenService.saveNewRefreshToken(user._id, deviceInfo, refreshToken);

        const accessToken = tokenService.generateAccessToken(user);

        return {accessToken, refreshToken};
    };

     async register(user, deviceInfo) {
        const checkUser = await userService.findUserByMail(user.mail);

        if (checkUser) {
            const error = new Error('User already exists');
            error.status = 401;
            throw error;
        }

        const savedUser = await userService.saveNewUser(user)

        const refreshToken = tokenService.generateRefreshToken(savedUser._id);

        await tokenService.saveNewRefreshToken(savedUser._id, deviceInfo, refreshToken);

        const accessToken = tokenService.generateAccessToken(savedUser);

        return {accessToken, refreshToken};
    };

     async refreshAccessToken(refreshToken) {
        if (!refreshToken) {
            const error = new Error("Missing refresh token");
            error.status = 400;
            throw error;
        }

        const refreshTokenDB = await tokenService.findValidRefreshToken(refreshToken);

        if (!refreshTokenDB) {
            const error = new Error("No valid token in database");
            error.status = 401;
            throw error;
        }

        if (!refreshTokenDB.userId) {
            const error = new Error("No user in database");
            error.status = 401;
            throw error;
        }

        const decoded = tokenService.verifyRefreshToken(refreshToken);
        if (!decoded) {
            const error = new Error("Invalid refresh token");
            error.status = 401;
            throw error;
        }

        return tokenService.generateAccessToken(refreshTokenDB.userId);
    };

     async logOut(refreshToken) {
        await tokenService.expireRefreshTokenByLogOut(refreshToken);
    };

     async authentication(accessToken, refreshToken) {
        let validAccessToken = accessToken;

        if (!accessToken) {
            validAccessToken = await this.refreshAccessToken(refreshToken);
        }

        const accessTokenDecoded = tokenService.verifyAccessToken(validAccessToken);

        return {validAccessToken, accessTokenDecoded};
    };
}