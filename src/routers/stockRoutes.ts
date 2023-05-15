import { Router } from "express";
import * as stockControllers from "../controllers/stockControllers";
import uploadMiddleware from "../middlewares/uploadMiddleware";

const stockRoutes = Router();

stockRoutes.post("/validate", uploadMiddleware.single("csvFile"), stockControllers.validatePrices);
stockRoutes.put("/update", uploadMiddleware.single("csvFile"), stockControllers.updatePrices);

export default stockRoutes;
