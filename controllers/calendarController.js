import {eventService} from "../services.js";

const calendarPage = (req, res) => {
    const today = new Date();
    const date = Object.keys(req.query).length === 1 ? new Date(req.query.date) : today;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const currentDate = eventService.yearAndMonthISOFormat(year, month);
    const previousDate = eventService.yearAndMonthISOFormat(month === 1 ? year - 1 : year, month === 1 ? 12 : month - 1);
    const nextDate = eventService.yearAndMonthISOFormat(month === 12 ? year + 1 : year, month === 12 ? 1 : month + 1);

    res.render("pages/actions/calendar/calendar", {currentDate, previousDate, nextDate});
};

const datePage = async (req, res, next) => {
    const date = req.params.date;
    const userId = res.locals.user;
    let events = [];
    try {
        events = await eventService.findAllEvents(userId, date);
    } catch (e) {
        return next(e);
    }
    res.render("pages/actions/calendar/date", {date, events});
};

const addNewEventPage = (req, res) => {
    const date = req.params.date;
    res.render("pages/actions/calendar/addNewEvent", {date});
};

const addNewEvent = async (req, res, next) => {
    const date = req.params.date;
    const userId = res.locals.user._id;
    const newEvent = req.body;
    try {
        await eventService.addNewEvent(userId, date, newEvent);
    } catch (e) {
        return next(e);
    }
    res.redirect(`/calendar/${date}`);
};

const deleteEvent = async (req, res, next) => {
    const date = req.params.date;
    const eventId = req.params.id;
    try {
        await eventService.deleteEvent(eventId);
    } catch (e) {
        return next(e);
    }
    res.redirect(`/calendar/${date}`);
};

const editEventPage = async (req, res, next) => {
    const date = req.params.date
    const eventId = req.params.id;
    let oldEvent;
    try {
        oldEvent = await eventService.findEventById(eventId);
    } catch (e) {
        return next(e);
    }
    res.render("pages/actions/calendar/editEvent", {oldEvent, date});
};

const editEvent = async (req, res, next) => {
    const eventId = req.params.id;
    const newEvent = req.body;
    try {
        await eventService.editEvent(eventId, newEvent);
    } catch (e) {
        return next(e);
    }
    res.redirect(`/calendar/${newEvent.date}`);
}

export const calendarController = {
    calendarPage,
    datePage,
    addNewEventPage,
    addNewEvent,
    deleteEvent,
    editEventPage,
    editEvent,
};