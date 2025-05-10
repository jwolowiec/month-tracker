import {costService, dateService} from "../services.js";

const monthlyCostPage = async (req, res, next) => {
    const checkedCategories = req.query.categories ? Array.isArray(req.query.categories) ? req.query.categories : [req.query.categories] : [];
    const today = new Date();
    const date = req.params.date !== undefined ? new Date(req.params.date) : today;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const userId = req.user._id;
    let costs;
    const categories = costService.getCostsCategories();

    const currentDate = dateService.yearAndMonthISOFormat(year, month);
    const previousDate = dateService.yearAndMonthISOFormat(month === 1 ? year - 1 : year, month === 1 ? 12 : month - 1);
    const nextDate = dateService.yearAndMonthISOFormat(month === 12 ? year + 1 : year, month === 12 ? 1 : month + 1);

    try {
        costs = await costService.findAllCosts(userId, currentDate, checkedCategories);
    } catch (e) {
        return next(e);
    }
    res.render("pages/actions/costs/costs", {costs, categories, checkedCategories, currentDate, previousDate, nextDate});
};

const addNewCostPage = (req, res) => {
    const categories = costService.getCostsCategories();
    res.render("pages/actions/costs/addNewCost", {categories});
};

const addNewCost = async (req, res, next) => {
    const cost = req.body;
    cost.user = req.user._id;
    try {
        await costService.addNewCost(cost);
    } catch (e) {
        return next(e);
    }
    res.redirect("/costs");
};

const editCostPage = async (req, res, next) => {
    const costId = req.params.id;
    const categories = costService.getCostsCategories();
    let cost;
    try {
        cost = await costService.findCostById(costId);
    } catch (e) {
        return next(e);
    }
    res.render("pages/actions/costs/editCost", {cost, categories});
};

const editCost = async (req, res, next) => {
    const cost = req.body;
    const costId = req.params.id;
    try {
        await costService.editCost(costId, cost);
    } catch (e) {
        return next(e);
    }
    res.redirect("/costs");
};

const deleteCost = async (req, res, next) => {
    const costId = req.params.id;
    try {
        await costService.deleteCost(costId);
    } catch (e) {
        return next(e);
    }
    res.redirect("/costs");
};

export const monthlyCostController = {
    monthlyCostPage,
    addNewCostPage,
    addNewCost,
    editCostPage,
    editCost,
    deleteCost,
};