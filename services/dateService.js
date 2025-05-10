export default class DateService{
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
}