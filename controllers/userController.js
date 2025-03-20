const userPage = (req, res) => {
    const user = req.user;
    res.render("pages/user/user", {user: user});
};

export const userController = {
    userPage,
};