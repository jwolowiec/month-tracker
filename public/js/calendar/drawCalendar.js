const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

const monthStartPosition = (year, month) => {
    let dayIndex = new Date(year, month - 1, 1).getDay();
    return dayIndex === 0 ? 6 : dayIndex - 1;
};

const dateISOFormat = (year, month, day) => {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const calendar = document.getElementById("calendar");
const [month, year] = document.getElementById("date").textContent.split("-").map((data) => {return parseInt(data)});
const date = new Date(year, month - 1);
const previousDateMonth = month === 1 ? 12 : month - 1;
const previousDateYear = month === 1 ? year - 1 : year;
const nextDateMonth = month === 12 ? 1 : month + 1;
const nextDateYear = month === 12 ? year + 1 : year;
const columns = window.getComputedStyle(calendar).getPropertyValue("grid-template-columns").split(" ").length;
const rows = window.getComputedStyle(calendar).getPropertyValue("grid-template-rows").split(" ").length;
let gridLayoutSize = columns * rows;

for (let i = 0; i < monthStartPosition(year, month); i++) {
    const previousMonthLastDay = daysInMonth(previousDateYear, previousDateMonth);
    const previousMonthDayTag = document.createElement("div");
    previousMonthDayTag.innerText = `${previousMonthLastDay - i}`;
    calendar.appendChild(previousMonthDayTag);
}
gridLayoutSize -= monthStartPosition(year, month);

for (let i = 1; i <= daysInMonth(year, month); i++) {
    const linkTag = document.createElement("a");
    const dayTag = document.createElement("div");
    linkTag.href = `/calendar/${dateISOFormat(year, month, i)}`;
    dayTag.className = "day";
    dayTag.innerText = `${i}`;
    linkTag.appendChild(dayTag);
    calendar.appendChild(linkTag);
}
gridLayoutSize -= daysInMonth(year, month);

for (let i = 1; i <= gridLayoutSize; i++) {
    const nextMonthDayTag = document.createElement("div");
    nextMonthDayTag.innerText = `${i}`;
    calendar.appendChild(nextMonthDayTag);
}