import express from "express";
import {errorController} from "../controllers/errorController.js";

const router = express.Router();

router.use(errorController.notFound);

export default router;
