const calendar = document.getElementById("calendar");
const date = moment(document.getElementById("date").textContent, 'MM-YYYY');

const previousMonthSpaceNumber = moment(date).isoWeekday() - 1;
const previousMonthDaysNumber = moment(date).subtract(1, 'M').daysInMonth();

const columns = window.getComputedStyle(calendar).getPropertyValue("grid-template-columns").split(" ").length;
const rows = window.getComputedStyle(calendar).getPropertyValue("grid-template-rows").split(" ").length;
let gridLayoutSize = columns * rows;

for (let i = previousMonthSpaceNumber; i > 0; i--) {
    const previousMonthDayTag = document.createElement("div");
    previousMonthDayTag.innerText = `${previousMonthDaysNumber - i + 1}`;
    calendar.appendChild(previousMonthDayTag);
}

gridLayoutSize -= previousMonthSpaceNumber;

for (let i = 1; i <= date.daysInMonth(); i++) {
    const linkTag = document.createElement("a");
    const dayTag = document.createElement("div");
    linkTag.href = `/calendar/${date.date(i).format('YYYY-MM-DD')}`;
    dayTag.className = "day";
    dayTag.innerText = `${i}`;
    linkTag.appendChild(dayTag);
    calendar.appendChild(linkTag);
}

gridLayoutSize -= date.daysInMonth();

for (let i = 1; i <= gridLayoutSize; i++) {
    const nextMonthDayTag = document.createElement("div");
    nextMonthDayTag.innerText = `${i}`;
    calendar.appendChild(nextMonthDayTag);
}
