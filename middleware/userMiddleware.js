import {authService} from "../services.js";

const setUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        req.user = null;
        res.locals.user = null;

        const {validAccessToken, accessTokenDecoded} = await authService.authentication(accessToken, refreshToken);

        if (accessTokenDecoded) {
            req.user = accessTokenDecoded.user;
            res.locals.user = accessTokenDecoded.user;

            if (!accessToken) {
                res.cookie("accessToken", validAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "Strict",
                    maxAge: 15 * 60 * 1000
                });
            }
        }
    } catch (e) {
        req.authError = e;
        req.user = null;
        res.locals.user = null;
    } finally {
        next();
    }
};

export const userMiddleware = {
    setUser,
};