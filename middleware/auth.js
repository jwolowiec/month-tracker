import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        const error = new Error("Missing auth token");
        error.status = 403;
        return next(error);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            const error = new Error("Missing auth token");
            error.status = 403;
            return next(error);
        }
        next();
    })
};

export const auth = {
    authUser,
}
