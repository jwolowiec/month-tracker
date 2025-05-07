const allDayEvent = document.getElementById("allDay");
const timeInput = document.getElementById("allDayEvent");
const timeStart = document.getElementById("timeStart");
const timeEnd = document.getElementById("timeEnd");

allDayEvent.addEventListener("change", (e) => {
    if (allDayEvent.checked) {
        timeInput.style.display = "none";

        timeStart.disabled = true;
        timeStart.value = null;

        timeEnd.disabled = true;
        timeEnd.value = null;
    } else {
        timeInput.style.display = "block";

        timeStart.disabled = false;
        if (!timeStart.value) timeStart.value = "12:00";

        timeEnd.disabled = false;
        if (!timeEnd.value) timeEnd.value = "13:00";
    }
});

allDayEvent.dispatchEvent(new Event('change'));
