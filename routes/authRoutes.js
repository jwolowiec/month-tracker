import express from "express";
import {authController} from "../controllers/authController.js";
import {validateMiddleware} from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/login", authController.loginPage);
router.post("/login", validateMiddleware.validateLogin, authController.authLogin);

router.get("/register", authController.registerPage);
router.post("/register", validateMiddleware.validateRegister, authController.authRegister);

router.post("/refresh", authController.refreshAuthToken);
router.get("/logout", authController.logOut);

export default router;