const calendarPage = (req, res) => {
    res.render("pages/actions/calendar", {title: "Koszty"});
};

export const calendarController = {
    calendarPage,
};