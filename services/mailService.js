import transporter from "../config/nodemailer.js";

export default class MailService{
    async sendMail(mail) {
        await transporter.sendMail({
            from: process.env.MAIL,
            to: process.env.MAIL,
            subject: mail.subject,
            text: mail.content,
            replyTo: mail.mail
        });
    };
}