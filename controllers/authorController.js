const aboutPage = (req, res) => {
    res.render("pages/author/about", {title: "O nas"});
};

const contactPage = (req, res) => {
    res.render("pages/author/contact", {title: "Kontakt"});
};

export const authorController = {
    aboutPage,
    contactPage,
};