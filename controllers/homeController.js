const showHomePage = (req, res) => {
    res.render("pages/index");
};

export const homeController = {
    showHomePage,
};