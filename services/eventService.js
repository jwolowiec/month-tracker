import Event from "../models/Event.js";
import {dateService} from "../services.js";

export default class EventService{

    findAllEvents = (userId, date) => {
        const dateObjStart = dateService.dateHandler(date);
        const dateObjEnd = new Date(dateObjStart);
        dateObjEnd.setHours(dateObjStart.getHours() + 24);
        return Event.find({
            user: userId,
            $or: [
                {date},
                {datetimeStart: {$gte: dateObjStart, $lte: dateObjEnd}}
            ]});
    };

    addNewEvent = async (userId, date, event) => {
        const {name, description, timeStart, timeEnd} = event;
        const dateObj = dateService.dateHandler(date);
        if (event.allDay) {
            await Event.create({name, description, user: userId, date: date});
        } else {
            const datetimeStart = dateService.datetimeHandler(dateObj, timeStart);

            const datetimeEnd = dateService.datetimeHandler(dateObj, timeEnd);

            if (datetimeStart >= datetimeEnd) {
                throw new Error("'datetimeEnd' must be after 'datetimeStart'")
            }

            await Event.create({name, description, user: userId, datetimeStart, datetimeEnd});
        }
    };

    deleteEvent = async (eventId) => {
        await Event.deleteOne({_id: eventId});
    };

    findEventById = (eventId) => {
        return Event.findOne({_id: eventId});
    };

    editEvent = async (eventId, editedEvent) => {
        const {name, description, date, timeStart, timeEnd} = editedEvent;
        const dateObj = dateService.dateHandler(date);
        if (editedEvent.allDay) {
            await Event.updateOne({_id: eventId}, {name, description, date: date, datetimeStart: null, datetimeEnd: null});
        } else {
            const datetimeStart = dateService.datetimeHandler(dateObj, timeStart);

            const datetimeEnd = dateService.datetimeHandler(dateObj, timeEnd);

            if (datetimeStart >= datetimeEnd) {
                throw new Error("'datetimeEnd' must be after 'datetimeStart'")
            }

            await Event.updateOne({_id: eventId}, {name, description, date: null, datetimeStart, datetimeEnd});
        }
    };
}