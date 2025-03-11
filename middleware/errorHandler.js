const notFound = (req, res, next) => {
    res.status(404).render("pages/errors/notFound");
};

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("pages/errors/serverError.ejs");
};

export const errorHandler = {
    notFound,
    errorHandlerMiddleware,
};