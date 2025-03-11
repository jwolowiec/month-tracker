const homePage = (req, res) => {
    res.render("pages/index", {title: "Strona główna"});
};

const calendarPage = (req, res) => {
    res.render("pages/actions/calendar", {title: "Kalendazr"});
};

export const homeController = {
    homePage,
    calendarPage,
};