import Cost from "../models/Cost.js";

export default class CostService{
    findAllCosts = (userId, date, checkedCategories) => {
        const query = {
            user: userId,
            date: { $regex: new RegExp(`^${date}`) },
            ...(checkedCategories.length > 0 && { category: { $in: checkedCategories } }),
        };
        return Cost.find(query);
    };

    findCostById = (costId) => {
        return Cost.findOne({_id: costId});
    };

    addNewCost = async (newCost) => {
        await Cost.create(newCost);
    };

    editCost = async (costId, newCost) => {
        await Cost.updateOne({_id: costId}, newCost);
    };

    deleteCost = async (costId) => {
        await Cost.deleteOne({_id: costId});
    };

    getCostsCategories = () => {
        return Cost.schema.path("category").enumValues;
    };
}