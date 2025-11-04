import { Router } from 'express';
import spotsController from '../controllers/spotsController.js';

const route = Router();

route.get("/", spotsController.getAll);
route.get("/:id", spotsController.getSpot);
route.post("/", spotsController.addSpot);
route.put("/:id", spotsController.updateSpot);
route.put("/:id/status", spotsController.updateSpotStatus);
route.delete("/:id", spotsController.removeSpot);

export default route;