import {costService} from "../services.js";

const monthlyCostPage = async (req, res, next) => {
    const checkedCategories = req.query.categories ? Array.isArray(req.query.categories) ? req.query.categories : [req.query.categories] : [];
    const userId = req.user._id;
    let costs;
    const categories = costService.getCostsCategories();

    try {
        costs = await costService.findAllCosts(userId, checkedCategories);
    } catch (e) {
        return next(e);
    }
    res.render("pages/actions/costs/costs", {costs, categories, checkedCategories});
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

export const monthlyCostController = {
    monthlyCostPage,
    addNewCostPage,
    addNewCost,
};