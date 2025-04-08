import Cost from "../models/Cost.js";

export default class CostService{
    findAllCostsByUserId = (userId) => {
        return Cost.find({user: userId}, {}, {});
    };

    addNewCost = async (newCost) => {
        await Cost.create(newCost);
    };
}