import transporter from "../config/nodemailer.js";

export default class MailService{
    sendMail = async (mail) => {
        await transporter.sendMail({
            from: process.env.MAIL,
            to: process.env.MAIL,
            subject: mail.subject,
            text: mail.content,
            replyTo: mail.mail
        });
    };
}