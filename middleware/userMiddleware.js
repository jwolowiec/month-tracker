import {authService} from "../services.js";

const setUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    req.user = null;
    res.locals.user = null;

    if (req.path === "/auth/refresh") {
        return next();
    }

    try {
        const url = req.protocol + "://" + req.get("host") + "/auth/refresh";

        const {validAccessToken, accessTokenDecoded} = await authService.authentication(accessToken, refreshToken, url);

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
        return next();
    } catch (e) {
        req.user = null;
        res.locals.user = null;
        return next();
    }
};

export const userMiddleware = {
    setUser,
};