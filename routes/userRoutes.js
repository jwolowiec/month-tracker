import express from "express";
import {userController} from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.showUserPage);
router.get("/edit", userController.showEditUserPage);
router.post("/edit", userController.editUser);

export default router;
