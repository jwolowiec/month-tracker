import express from "express";
import {monthlyCostController} from "../controllers/monthlyCostController.js";

const router = express.Router();

router.get("/", monthlyCostController.monthlyCostPage);

router.post("/add-cost", monthlyCostController.addNewCost);

export default router;