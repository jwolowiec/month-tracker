import User from "../models/User.js";
import Cost from "../models/Cost.js";

const monthlyCostPage = async (req, res) => {
    const options = { _id: 1, name: 1, surname: 1};
    const data = await User.find({}, options);
    console.log(data);
    res.render("pages/actions/costs", {title: "Koszty", users: data});
};

const addNewUser = async (req, res) => {
    console.log(req.body);
    const result = await User.insertOne(req.body);
    console.log(result);
    res.send("Git")
};

const addNewCost = async (req, res) => {
    const validatedData = req.body;
    console.log(validatedData);
    const result = await Cost.insertOne(req.body);
    console.log(result);
    res.send("GIT");
};

export const monthlyCostController = {
    monthlyCostPage,
    addNewUser,
    addNewCost,
};