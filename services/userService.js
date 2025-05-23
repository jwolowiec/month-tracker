import User from "../models/User.js";
import bcrypt from "bcrypt";

export default class UserService{
    findUserByMail = (mail) => {
        return User.findOne({mail: mail});
    };

    checkPassword = (inputPassword, savedPassword) => {
        return bcrypt.compare(inputPassword, savedPassword);
    };

    saveNewUser = async (user) => {
        const {name, surname, mail, password} = user;
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT) || 10);
        return User.create({ name, surname, mail, password: hashedPassword });
    };

    editUserData = async (userId, userNewData) => {
        await User.updateOne({_id: userId}, userNewData);
    };
}