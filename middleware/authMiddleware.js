const authUser = (req, res, next) => {
    if (req.authError) {
        return next(req.authError);
    }
    next();
};

export const authMiddleware = {
    authUser,
}
