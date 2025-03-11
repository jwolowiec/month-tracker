// const errorPage = (err, req, res, next) => {
//     console.log(err);
//     const status = err.status || 500;
//     const message = err.message || "Internal Server Error";
//
//     res.status(status).render("pages/errors/error", { message, status });
// };

const notFound = (req, res, next) => {
    res.status(404).render("pages/errors/error");
};

export const errorController = {
    // errorPage,
    notFound,
};