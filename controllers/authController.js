import bcrypt from "bcrypt";
import User from "../models/User.js";
import {authService} from "../services/auth.js";

const loginPage = (req, res) => {
    const mail = req.query.mail || "";
    const message = req.query.message || "";

    res.render("pages/auth/login", {mail: mail, message: message});
};

const authLogin = async (req, res, next) => {
    const {mail, password} = req.body;

    try {
        const user = await User.findOne({mail: mail});

        if (!user) {
            return res.redirect(`/auth/login?mail=${mail}&message=Użytkownik nie istnieje. Zarejestruj się.`);
        }

        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
            const token = authService.generateAccessToken(user._id);

            const cookie = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 24 * 60 * 60
            };

            return res.cookie("authToken", token, cookie).redirect("/");
        } else {
            const error = new Error("Error during login");
            error.status = 401;
            return next(error);
        }

    } catch (e) {
        const error = new Error("Error during login");
        next(error);
    }
};

const registerPage = (req, res) => {
    res.render("pages/auth/register");
};

const authRegister = async (req, res, next) => {
    const {name, surname, mail, password} = req.body;

    try {
        const user = await User.findOne({mail: mail});

        if (user) {
            return res.redirect(`/auth/login?mail=${mail}&message=Użytkownik już istnieje. Zaloguj się.`);
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

        const savedUser = await User.create({ name, surname, mail, password: hashedPassword });

        const token = authService.generateAccessToken(savedUser._id);

        const cookie = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60
        };
        //res.redirect(`/auth/login?mail=${mail}&message=Pomyślnie zarejestrowano użytkownika`);

        res.cookie("authToken", token, cookie);
        res.redirect(`/`);
    } catch (e) {
        const error = new Error("Error during register");
        next(error);
    }
};

const logOut = (req, res) => {
    res.clearCookie("authToken");
    res.redirect("/");
};

export const authController = {
    loginPage,
    authLogin,
    registerPage,
    authRegister,
    logOut,
};