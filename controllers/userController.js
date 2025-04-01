import User from "../models/User.js";

const userPage = (req, res) => {
    const user = req.user;
    res.render("pages/user/user", {user: user});
};

const editUserPage = (req, res) => {
    const user = req.user;
    res.render("pages/user/editUser", {user: user});
};

const editUser = async (req, res, next) => {
    const user = req.body;

    try {
        console.log(user);
        await User.save(user);
        res.redirect("/user");
    } catch (error) {
        next(error);
    }
};

export const userController = {
    userPage,
    editUserPage,
    editUser,
};