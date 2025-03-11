import express from "express";
import {authController} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", authController.loginPage);
router.get("/register", authController.registerPage);

export default router;