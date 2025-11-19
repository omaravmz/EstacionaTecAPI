import { Router } from 'express';
import sensorController from '../controllers/sensorController.js';

const route = Router();

route.get("/", sensorController.getAll);
route.post("/", sensorController.addSensor);
route.get("/status-count", sensorController.getStatusCount);
route.get("/active", sensorController.getSensorsActive);
route.get("/unactive", sensorController.getSensorsUnactive);

route.get("/:sensor_ID", sensorController.getSensor);
route.put("/:sensor_ID", sensorController.updateSensor);
route.delete("/:sensor_ID", sensorController.removeSensor);
route.put("/:sensor_ID/status", sensorController.updateSensorStatus);

export default route;


