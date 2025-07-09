import {costService, dateService} from "../services.js";

const showMonthlyCostPage = async (req, res, next) => {
    try {
        const checkedCategories = req.query.categories ? Array.isArray(req.query.categories) ? req.query.categories : [req.query.categories] : [];
        const userId = req.user._id;
        const categories = costService.getCostsCategories();

        const today = dateService.getCurrentDate();
        const dateArray = [req.query.year, req.query.month];

        const currentDate = req.query.year === undefined || req.query.month === undefined ? today : dateService.getDateByArray(dateArray);
        const previousDate = dateService.subtractFromDate(currentDate, 1, 'M');
        const nextDate = dateService.addToDate(currentDate, 1, 'M');

        const costs = await costService.findAllCosts(userId, currentDate.format('YYYY-MM'), checkedCategories);

        res.render("pages/actions/costs/costs", {costs, categories, checkedCategories, currentDate, previousDate, nextDate});
    } catch (e) {
        next(e);
    }
};

const addNewCostPage = (req, res) => {
    const categories = costService.getCostsCategories();
    res.render("pages/actions/costs/addNewCost", {categories});
};

const addNewCost = async (req, res, next) => {
    try {
        const cost = req.body;
        cost.user = req.user._id;
        await costService.addNewCost(cost);

        res.redirect("/costs");
    } catch (e) {
        return next(e);
    }
};

const showEditCostPage = async (req, res, next) => {
    try {
        const costId = req.params.id;
        const categories = costService.getCostsCategories();
        const cost = await costService.findCostById(costId);

        res.render("pages/actions/costs/editCost", {cost, categories});
    } catch (e) {
        return next(e);
    }
};

const editCost = async (req, res, next) => {
    try {
        const cost = req.body;
        const costId = req.params.id;
        await costService.editCost(costId, cost);

        res.redirect("/costs");
    } catch (e) {
        return next(e);
    }
};

const showCyclicCostPage = (req, res, next) => {
    const cyclicCosts = [];
    res.render("pages/actions/costs/cyclicCosts", {cyclicCosts});
};

const deleteCost = async (req, res, next) => {
    try {
        const costId = req.params.id;
        await costService.deleteCost(costId);

        res.redirect("/costs");
    } catch (e) {
        return next(e);
    }
};

export const monthlyCostController = {
    showMonthlyCostPage,
    addNewCostPage,
    addNewCost,
    showEditCostPage,
    editCost,
    showCyclicCostPage,
    deleteCost,
};