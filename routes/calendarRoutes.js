import express from "express";
import {calendarController} from "../controllers/calendarController.js";

const router = express.Router();

router.get("/", calendarController.calendarPage);

export default router;