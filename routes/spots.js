import { Router } from 'express';
import spotsController from '../controllers/spotsController.js';

const route = Router();

route.get("/", spotsController.getAll);
route.post("/", spotsController.addSpot);
route.get("/status-count", spotsController.getStatusCount);
route.get("/available", spotsController.getSpotsAvailable);
route.get("/occupied", spotsController.getSpotsOccupied);

route.get("/:id", spotsController.getSpot);
route.put("/:id", spotsController.updateSpot);
route.delete("/:id", spotsController.removeSpot);
route.put("/:id/status", spotsController.updateSpotStatus);

export default route;


