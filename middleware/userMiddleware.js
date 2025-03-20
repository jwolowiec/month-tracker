import jwt from "jsonwebtoken";

const setUser = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        res.locals.user = null;
        return next();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.locals.user = null;
            return next();
        }
        req.user = decoded.user;
        res.locals.user = decoded.user;
        next();
    });
};

export const userMiddleware = {
    setUser,
};