import express from "express";
import {userController} from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.userPage);
router.get("/edit", userController.editUserPage);
router.post("/edit", userController.editUser);

export default router;
