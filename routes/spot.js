import { Router } from 'express';
import spotController from '../controllers/spotController.js';

const route = Router();

route.get("/", spotController.getAll);
route.post("/", spotController.addSpot);
route.get("/available", spotController.getSpotsAvailable);
route.get("/occupied", spotController.getSpotsOccupied);

route.get("/:spot_num", spotController.getSpot);
route.put("/:spot_num", spotController.updateSpot);
route.delete("/:spot_num", spotController.removeSpot);
route.put("/:spot_num/status", spotController.updateSpotStatus);

export default route;


