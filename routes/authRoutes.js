import express from "express";
import {authController} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", authController.loginPage);
router.post("/login", authController.authLogin);

router.get("/register", authController.registerPage);
router.post("/register", authController.authRegister);

router.get("/logout", authController.logOut);

export default router;