import { Router } from "express";
import * as stockControllers from "../controllers/stockControllers";

const stockRoutes = Router();

stockRoutes.put("/", stockControllers.updatePrices);

export default stockRoutes;
