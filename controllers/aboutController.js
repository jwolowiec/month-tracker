import {mailService} from "../services.js";

const showAboutPage = (req, res) => {
    res.render("pages/about/about");
};

const sendMail = async (req, res, next) => {
    const mail = req.body;
    try {
        await mailService.sendMail(mail);
    } catch (e) {
        next(e);
    }
    res.redirect("/about");
};

export const aboutController = {
    showAboutPage,
    sendMail,
};