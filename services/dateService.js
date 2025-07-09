import moment from "moment";

export default class DateService{
    getCurrentDate() {
        return moment();
    }

    getDateByArray(array) {
        return moment(array);
    }

    getDateByStringDate(date) {
        return moment(date);
    }

    getDatetime(date, time) {
        const datetimeString = `${date} ${time}`;
        return moment(datetimeString, 'YYYY-MM-DD HH:mm');
    }

    subtractFromDate(date, number, unit) {
        return moment(date).subtract(number, unit);
    }

    addToDate(date, number, unit) {
        return moment(date).add(number, unit);
    }
}