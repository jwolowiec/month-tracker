import jwt from "jsonwebtoken";

const setUser = async (req, res, next) => {
    let tokenChange = false;
    let authToken = req.cookies.authToken;
    req.user = null;
    res.locals.user = null;

    if (req.path === "/auth/refresh") {
        return next();
    }

    try {
        if (!authToken) {
            const response = await fetch(req.protocol + "://" + req.get("host") + "/auth/refresh", {
                method: "post",
                credentials: "include",
                headers: { "Content-Type": "application/json", "Cookie": `refreshToken=${req.cookies.refreshToken}`},
            });
            const data = await response.json();
            if (data.message) {
                return next();
            }
            authToken = data.authToken;
            tokenChange = true;
        }

        const authTokenDecoded = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);

        if (authTokenDecoded) {
            req.user = authTokenDecoded.user;
            res.locals.user = authTokenDecoded.user;

            if (tokenChange) {
                res.cookie("authToken", authToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "Strict",
                    maxAge: 15 * 60 * 1000
                });
            }
        }
        next();
    } catch (e) {
        req.user = null;
        res.locals.user = null;
        return next();
    }
};

export const userMiddleware = {
    setUser,
};