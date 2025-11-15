import { Router } from 'express';
import sensorsController from '../controllers/sensorsController.js';

const route = Router();

route.get("/", sensorsController.getAll);
route.post("/", sensorsController.addSensor);
route.get("/status-count", sensorsController.getStatusCount);
route.get("/active", sensorsController.getSensorsActive);
route.get("/unactive", sensorsController.getSensorsUnactive);

route.get("/:sensor_ID", sensorsController.getSensor);
route.put("/:sensor_ID", sensorsController.updateSensor);
route.delete("/:sensor_ID", sensorsController.removeSensor);
route.put("/:sensor_ID/status", sensorsController.updateSensorStatus);

export default route;


