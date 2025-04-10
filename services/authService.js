import {tokenService, userService} from "../services.js";

export default class AuthService{
    login = async (mail, password, deviceInfo) => {
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

    register = async (user, deviceInfo) => {
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

    refreshAccessToken = async (refreshToken) => {
        if (!refreshToken) {
            return {token: undefined, message: "Missing refresh token", status: 400};
        }

        const refreshTokenDB = await tokenService.findValidRefreshToken(refreshToken);

        if (!refreshTokenDB) {
            return {token: undefined, message: "No valid token in database", status: 401};
        }

        if (!refreshTokenDB.userId) {
            return {token: undefined, message: "No user in database", status: 401};
        }

        const decoded = tokenService.verifyRefreshToken(refreshToken);
        if (!decoded) {
            return {token: undefined, message: "Invalid refresh token", status: 401};
        }

        const result = tokenService.generateAccessToken(refreshTokenDB.userId);

        return {token: result};
    };

    logOut = async (refreshToken) => {
        await tokenService.expireRefreshTokenByLogOut(refreshToken);
    };

    authentication = async (accessToken, refreshToken, url) => {
        let validAccessToken = accessToken;

        if (!accessToken) {
            const response = await fetch(url, {
                method: "post",
                credentials: "include",
                headers: { "Content-Type": "application/json", "Cookie": `refreshToken=${refreshToken}`},
            });
            const data = await response.json();
            if (data.message) {
                const error = new Error(data.message);
                error.status = data.status;
                throw error;
            }
            validAccessToken = data.accessToken;
        }

        const accessTokenDecoded = tokenService.verifyAccessToken(validAccessToken);

        return {validAccessToken, accessTokenDecoded};
    };
}