import express from "express";
import {monthlyCostController} from "../controllers/monthlyCostController.js";
import {validateMiddleware} from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/", monthlyCostController.monthlyCostPage);

router.get("/add-cost", monthlyCostController.addNewCostPage);
router.post("/add-cost", validateMiddleware.validateCost, monthlyCostController.addNewCost);

export default router;