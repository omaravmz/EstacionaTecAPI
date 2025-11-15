import { Router } from 'express';
import spotsController from '../controllers/spotsController.js';

const route = Router();

route.get("/", spotsController.getAll);
route.post("/", spotsController.addSpot);
route.get("/status-count", spotsController.getStatusCount);
route.get("/available", spotsController.getSpotsAvailable);
route.get("/occupied", spotsController.getSpotsOccupied);

route.get("/:spot_num", spotsController.getSpot);
route.put("/:spot_num", spotsController.updateSpot);
route.delete("/:spot_num", spotsController.removeSpot);
route.put("/:spot_num/status", spotsController.updateSpotStatus);

export default route;


