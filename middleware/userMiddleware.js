const setUser = (req, res, next) => {
    res.locals.user = req.cookies.authToken || null;
    next();
};

export const userMiddleware = {
    setUser,
};