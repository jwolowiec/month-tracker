const aboutPage = (req, res) => {
    res.render("pages/author/about");
};

const contactPage = (req, res) => {
    res.render("pages/author/contact");
};

export const authorController = {
    aboutPage,
    contactPage,
};