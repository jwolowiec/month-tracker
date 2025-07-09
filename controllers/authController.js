import {authService} from "../services.js";

const showLoginPage = (req, res) => {
    const mail = req.query.mail || "";
    const message = req.query.message || "";

    res.render("pages/auth/login", {mail: mail, message: message});
};

const authLogin = async (req, res, next) => {
    try {
        const {mail, password} = req.body;
        const deviceInfo = req.headers["user-agent"];
        const {accessToken, refreshToken} = await authService.login(mail, password, deviceInfo);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.redirect("/");

    } catch (e) {
        next(e);
    }
};

const showRegisterPage = (req, res) => {
    res.render("pages/auth/register");
};

const authRegister = async (req, res, next) => {
    try {
        const user = req.body;
        const deviceInfo = req.headers["user-agent"];
        const {accessToken, refreshToken} = await authService.register(user, deviceInfo);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.redirect(`/`);
    } catch (e) {
        next(e);
    }
};

const logOut = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        await authService.logOut(refreshToken);

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.redirect("/");
    } catch (e) {
        next(e);
    }
};

export const authController = {
    showLoginPage,
    authLogin,
    showRegisterPage,
    authRegister,
    logOut,
};