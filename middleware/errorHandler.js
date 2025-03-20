const notFound = (req, res, next) => {
    const error = new Error("Page not found");
    error.status = 404;
    next(error);
};

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500; // Jeśli nie ma statusu, ustawiamy 500
    const errorMessage = err.message || "Internal server error";

    if (statusCode === 404) {
        res.status(statusCode).render("pages/errors/notFound", { error: errorMessage });
    } else {
        res.status(statusCode).render("pages/errors/serverError", { status: statusCode, error: errorMessage });
    }
};

export const errorHandler = {
    notFound,
    errorHandlerMiddleware,
};
