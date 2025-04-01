import bcrypt from "bcrypt";
import User from "../models/User.js";
import {authService} from "../services/auth.js";
import RefreshToken from "../models/RefreshToken.js";
import jwt from "jsonwebtoken";

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

        if (!valid) {
            const error = new Error("Wrong password");
            error.status = 401;
            return next(error);
        }

        const deviceInfo = req.headers["user-agent"];
        await RefreshToken.updateOne({userId: user._id, deviceInfo: deviceInfo}, {expired: true});

        const refreshToken = authService.generateRefreshToken(user._id);
        await RefreshToken.create({
            userId: user._id,
            token: refreshToken,
            deviceInfo: deviceInfo
        });

        const token = authService.generateAccessToken(user);

        res.cookie("authToken", token, {
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
    const {name, surname, mail, password} = req.body;
    try {
        const user = await User.findOne({mail: mail});

        if (user) {
            return res.redirect(`/auth/login?mail=${mail}&message=Użytkownik już istnieje. Zaloguj się.`);
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        const savedUser = await User.create({ name, surname, mail, password: hashedPassword });
        const deviceInfo = req.headers["user-agent"];
        const refreshToken = authService.generateRefreshToken(savedUser._id);

        await RefreshToken.create({
            userId: savedUser._id,
            token: refreshToken,
            deviceInfo: deviceInfo,
        });

        const authToken = authService.generateAccessToken(savedUser);

        res.cookie("authToken", authToken, {
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
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({message: "Missing refresh token"});
        }

        const refreshTokenDB = await RefreshToken.findOne({
            token: refreshToken,
            $or: [
                {expireTime: {$gte: new Date()}},
                {expired: false},
            ]
        }).populate("userId");

        if (!refreshTokenDB) {
            return res.status(401).json({message: "Expired refresh token in database"});
        }

        if (!refreshTokenDB.userId) {
            return res.status(401).json({message: "Expired refresh token in database"});
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({message: "Invalid refresh token"});
        }

        const authToken = authService.generateAccessToken(refreshTokenDB.userId)

        res.json({authToken: authToken})
    } catch (e) {
        res.status(401).json({message: e.message});
    }
};

const logOut = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        await RefreshToken.updateOne({token: refreshToken}, {expired: true})
    } catch (e) {
        const error = new Error(e);
        next(error);
    }
    res.clearCookie("authToken");
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