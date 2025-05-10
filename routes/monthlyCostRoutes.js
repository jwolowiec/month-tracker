import express from "express";
import {monthlyCostController} from "../controllers/monthlyCostController.js";
import {validateMiddleware} from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/add-cost", monthlyCostController.addNewCostPage);
router.post("/add-cost", validateMiddleware.validateCost, monthlyCostController.addNewCost);

router.get("/delete/:id", monthlyCostController.deleteCost);

router.get("/edit/:id", monthlyCostController.editCostPage);
router.post("/edit/:id", validateMiddleware.validateCost, monthlyCostController.editCost);

router.get("/", monthlyCostController.monthlyCostPage);
router.get("/:date", monthlyCostController.monthlyCostPage);

export default router;