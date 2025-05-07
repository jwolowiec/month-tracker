import Event from "../models/Event.js";

export default class EventService{
    yearAndMonthISOFormat = (year, month) => {
        return `${year}-${String(month).padStart(2, "0")}`;
    }

    dateHandler = (date) => {
        const [year, month, day] = date.split("-");
        return new Date(year, month - 1, day);
    };

    datetimeHandler = (dateObj, time) => {
        const [hours, min] = time.split(":").map(data => {return parseInt(String(data))});
        const datetime = new Date(dateObj);
        datetime.setHours(hours, min);
        return datetime;
    }

    findAllEvents = (userId, date) => {
        const dateObjStart = this.dateHandler(date);
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
        const dateObj = this.dateHandler(date);
        if (event.allDay) {
            await Event.create({name, description, user: userId, date: date});
        } else {
            const datetimeStart = this.datetimeHandler(dateObj, timeStart);

            const datetimeEnd = this.datetimeHandler(dateObj, timeEnd);

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
        const dateObj = this.dateHandler(date);
        if (editedEvent.allDay) {
            await Event.updateOne({_id: eventId}, {name, description, date: date, datetimeStart: null, datetimeEnd: null});
        } else {
            const datetimeStart = this.datetimeHandler(dateObj, timeStart);

            const datetimeEnd = this.datetimeHandler(dateObj, timeEnd);

            if (datetimeStart >= datetimeEnd) {
                throw new Error("'datetimeEnd' must be after 'datetimeStart'")
            }

            await Event.updateOne({_id: eventId}, {name, description, date: null, datetimeStart, datetimeEnd});
        }
    };
}