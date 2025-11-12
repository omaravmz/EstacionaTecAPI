import { Router } from 'express';
import reportsController from '../controllers/reportsController.js';

const route = Router();

route.get("/", reportsController.getAll);
route.post("/", reportsController.createReport);
route.delete("/:id", reportsController.removeReport);
route.put("/:id/status", reportsController.updateReportStatus);

export default route;


