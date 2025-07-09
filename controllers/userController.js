import {userService} from "../services.js";

const showUserPage = (req, res) => {
    const user = req.user;
    res.render("pages/user/user", {user});
};

const showEditUserPage = (req, res) => {
    const user = req.user;
    res.render("pages/user/editUser", {user});
};

const editUser = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userNewData = req.body;
        await userService.editUserData(userId, userNewData);

        res.clearCookie("accessToken");
        res.redirect("/user");
    } catch (e) {
        next(e);
    }
};

export const userController = {
    showUserPage,
    showEditUserPage,
    editUser,
};