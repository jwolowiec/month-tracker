import CostService from "../services/costService.js";

const costService = new CostService();

const monthlyCostPage = async (req, res, next) => {
    const userId = req.user._id;
    let allCosts;
    try {
        allCosts = await costService.findAllCostsByUserId(userId);
    } catch (e) {
        return next(e);
    }
    res.render("pages/actions/costs", {costs: allCosts});
};

const addNewCost = async (req, res, next) => {
    const cost = req.body;
    try {
        await costService.addNewCost(cost);
    } catch (e) {
        return next(e);
    }
    res.redirect("/costs");
};

export const monthlyCostController = {
    monthlyCostPage,
    addNewCost,
};