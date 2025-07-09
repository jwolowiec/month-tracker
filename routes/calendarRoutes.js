import express from "express";
import {calendarController} from "../controllers/calendarController.js";
import {validateMiddleware} from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/", calendarController.showCalendarPage);
router.get("/:date", calendarController.showDatePage);

router.get("/:date/add-event", calendarController.showAddNewEventPage);
router.post("/:date/add-event", validateMiddleware.validateEvent, calendarController.addNewEvent);

router.get("/:date/delete/:id", calendarController.deleteEvent);

router.get("/:date/edit/:id", calendarController.showEditEventPage);
router.post("/:date/edit/:id", validateMiddleware.validateEvent, calendarController.editEvent);

export default router;