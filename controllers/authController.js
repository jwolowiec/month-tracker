const loginPage = (req, res) => {
    res.render("pages/auth/login", {title: "Zaloguj się"});
};

const registerPage = (req, res) => {
    res.render("pages/auth/register", {title: "Zarejestruj się"});
};

export const authController = {
    loginPage,
    registerPage,
};