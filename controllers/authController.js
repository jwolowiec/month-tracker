import AuthService from "../services/authService.js";

const authService = new AuthService();

const loginPage = (req, res) => {
    const mail = req.query.mail || "";
    const message = req.query.message || "";

    res.render("pages/auth/login", {mail: mail, message: message});
};

const authLogin = async (req, res, next) => {
    const {mail, password} = req.body;
    const deviceInfo = req.headers["user-agent"];
    try {
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
        const error = new Error(e);
        next(error);
    }
};

const registerPage = (req, res) => {
    res.render("pages/auth/register");
};

const authRegister = async (req, res, next) => {
    const user = req.body;
    const deviceInfo = req.headers["user-agent"];
    try {
        const {accessToken, refreshToken} = authService.register(user, deviceInfo);

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
        const error = new Error(e);
        next(error);
    }
};

const refreshAuthToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        const result = await authService.refreshAccessToken(refreshToken);

        if (!result.token) {
            return res.status(result.status).json({message: result.message});
        }

        res.json({accessToken: result.token})
    } catch (e) {
        res.status(401).json({message: e.message});
    }
};

const logOut = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        await authService.logOut(refreshToken);
    } catch (e) {
        const error = new Error(e);
        next(error);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.redirect("/");
};

export const authController = {
    loginPage,
    authLogin,
    registerPage,
    authRegister,
    refreshAuthToken,
    logOut,
};