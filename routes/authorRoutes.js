import express from "express";
import {authorController} from "../controllers/authorController.js";

const router = express.Router();

router.get("/about", authorController.aboutPage);
router.get("/contact", authorController.contactPage);

export default router;