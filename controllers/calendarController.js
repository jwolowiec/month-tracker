import {dateService, eventService} from "../services.js";

const showCalendarPage = (req, res) => {
    const dateArray = [req.query.year, req.query.month];
    const today = dateService.getCurrentDate();
    const currentDate = Object.keys(req.query).length === 0 ? today : dateService.getDateByArray(dateArray);
    const previousDate = dateService.subtractFromDate(currentDate, 1, 'M');
    const nextDate = dateService.addToDate(currentDate, 1, 'M');

    res.render("pages/actions/calendar/calendar", {currentDate, previousDate, nextDate});
};

const showDatePage = async (req, res, next) => {
    try {
        const date = req.params.date;
        const userId = res.locals.user;
        const events = await eventService.findAllEvents(userId, date);

        res.render("pages/actions/calendar/date", {date, events});
    } catch (e) {
        next(e);
    }
};

const showAddNewEventPage = (req, res) => {
    const date = req.params.date;
    res.render("pages/actions/calendar/addNewEvent", {date});
};

const addNewEvent = async (req, res, next) => {
    try {
        const date = req.params.date;
        const userId = res.locals.user._id;
        const newEvent = req.body;

        await eventService.addNewEvent(userId, date, newEvent);

        res.redirect(`/calendar/${date}`);
    } catch (e) {
        next(e);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const date = req.params.date;
        const eventId = req.params.id;

        await eventService.deleteEvent(eventId);

        res.redirect(`/calendar/${date}`);
    } catch (e) {
        next(e);
    }
};

const showEditEventPage = async (req, res, next) => {
    try {
        const date = req.params.date
        const eventId = req.params.id;
        const oldEvent = await eventService.findEventById(eventId);

        res.render("pages/actions/calendar/editEvent", {oldEvent, date});
    } catch (e) {
        next(e);
    }
};

const editEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const newEvent = req.body;

        await eventService.editEvent(eventId, newEvent);

        res.redirect(`/calendar/${newEvent.date}`);
    } catch (e) {
        next(e);
    }
}

export const calendarController = {
    showCalendarPage,
    showDatePage,
    showAddNewEventPage,
    addNewEvent,
    deleteEvent,
    showEditEventPage,
    editEvent,
};