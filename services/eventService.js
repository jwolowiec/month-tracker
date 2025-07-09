import Event from "../models/Event.js";
import {dateService} from "../services.js";

export default class EventService{
    findAllEvents(userId, date) {
        const datetimeStart = dateService.getDateByStringDate(date);
        const datetimeEnd = dateService.addToDate(datetimeStart, 24, "H");

        return Event.find({
            user: userId,
            $or: [
                {date},
                {datetimeStart: {$gte: datetimeStart, $lte: datetimeEnd}}
            ]});
    };

    async addNewEvent(userId, date, event) {
        const {name, description, timeStart, timeEnd} = event;

        if (event.allDay) {
            await Event.create({name, description, user: userId, date: date});
        } else {
            const datetimeStart = dateService.getDatetime(date, timeStart);
            const datetimeEnd = dateService.getDatetime(date, timeEnd);

            if (datetimeStart >= datetimeEnd) {
                throw new Error("'datetimeEnd' must be after 'datetimeStart'")
            }

            await Event.create({name, description, user: userId, datetimeStart, datetimeEnd});
        }
    };

    async deleteEvent(eventId) {
        await Event.deleteOne({_id: eventId});
    };

    findEventById(eventId) {
        return Event.findOne({_id: eventId});
    };

    async editEvent(eventId, editedEvent) {
        const {name, description, date, timeStart, timeEnd} = editedEvent;
        if (editedEvent.allDay) {
            await Event.updateOne({_id: eventId}, {name, description, date: date, datetimeStart: null, datetimeEnd: null});
        } else {
            const datetimeStart = dateService.getDatetime(date, timeStart);
            const datetimeEnd = dateService.getDatetime(date, timeEnd);

            if (datetimeStart >= datetimeEnd) {
                throw new Error("'datetimeEnd' must be after 'datetimeStart'")
            }

            await Event.updateOne({_id: eventId}, {name, description, date: null, datetimeStart, datetimeEnd});
        }
    };
}