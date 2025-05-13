import express from "express";
import {aboutController} from "../controllers/aboutController.js";
import {validateMiddleware} from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/", aboutController.aboutPage);

router.post("/mail", validateMiddleware.validateMail, aboutController.sendMail);

export default router;