import { Router } from 'express';
import sensorsController from '../controllers/sensorsController.js';

const route = Router();

route.get("/", sensorsController.getAll);
route.post("/", sensorsController.addSensor);
route.get("/status-count", sensorsController.getStatusCount);
route.get("/active", sensorsController.getSensorsActive);
route.get("/unactive", sensorsController.getSensorsUnactive);

route.get("/:id", sensorsController.getSensor);
route.put("/:id", sensorsController.updateSensor);
route.delete("/:id", sensorsController.removeSensor);
route.put("/:id/status", sensorsController.updateSensorStatus);

export default route;


