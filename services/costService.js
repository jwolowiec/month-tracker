import Cost from "../models/Cost.js";

export default class CostService{
    findAllCosts = (userId, checkedCategories) => {
        if (checkedCategories.length > 0) {
            return Cost.find({user: userId, category: {$in: checkedCategories}});
        }
        return Cost.find({user: userId});
    };

    addNewCost = async (newCost) => {
        await Cost.create(newCost);
    };

    getCostsCategories = () => {
        return Cost.schema.path("category").enumValues;
    };
}