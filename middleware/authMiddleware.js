const authUser = (req, res, next) => {
    if (!req.user) {
        const error = new Error("Missing authMiddleware token or wrong token");
        error.status = 401;
        return next(error);
    }
    next();
};

export const authMiddleware = {
    authUser,
}
