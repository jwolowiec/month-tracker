import {body, validationResult} from "express-validator";

const validateLogin = [
    body("mail").isEmail().withMessage("Podaj poprawny adres e-mail"),
    body("password").notEmpty().withMessage("Hasło jest wymagane"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation error");
            error.status = 400;
            return next(error);
        }
        next();
    }
];

const validateRegister = [
    body("name").notEmpty().withMessage("Imię jest wymagane"),
    body("surname").notEmpty().withMessage("Nazwisko jest wymagane"),
    body("mail").isEmail().withMessage("Podaj poprawny adres e-mail"),
    body("password").isLength({min: 2}).withMessage("Hasło musi mieć conajmniej 2 znaki"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation error");
            error.status = 400;
            return next(error);
        }
        next();
    }
];

const validateCost = [
    body("name").notEmpty().withMessage("Nazwa kosztu jest wymagana"),
    body("cost").notEmpty().withMessage("Wprowadzenie kosztu jest wymagane"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation error");
            error.status = 400;
            return next(error);
        }
        next()
    }
];

export const validateMiddleware = {
    validateLogin,
    validateRegister,
    validateCost,
};