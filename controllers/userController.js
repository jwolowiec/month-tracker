import UserService from "../services/userService.js";

const userService = new UserService();

const userPage = (req, res) => {
    const user = req.user;
    res.render("pages/user/user", {user: user});
};

const editUserPage = (req, res) => {
    const user = req.user;
    res.render("pages/user/editUser", {user: user});
};

const editUser = async (req, res, next) => {
    const userId = req.user._id;
    const userNewData = req.body;
    try {
        await userService.editUserData(userId, userNewData);
        res.clearCookie("accessToken");
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