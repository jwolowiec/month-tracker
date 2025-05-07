import express from "express";
import {calendarController} from "../controllers/calendarController.js";
import {validateMiddleware} from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/", calendarController.calendarPage);
router.get("/:date", calendarController.datePage);

router.get("/:date/add-event", calendarController.addNewEventPage);
router.post("/:date/add-event", validateMiddleware.validateEvent, calendarController.addNewEvent);

router.get("/:date/delete/:id", calendarController.deleteEvent);

router.get("/:date/edit/:id", calendarController.editEventPage);
router.post("/:date/edit/:id", calendarController.editEvent);

export default router;