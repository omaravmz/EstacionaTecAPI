import { Router } from 'express';
import reportController from '../controllers/reportController.js';

const route = Router();

route.get("/", reportController.getAll);
route.post("/", reportController.createReport);
route.delete("/:id", reportController.removeReport);
route.put('/:id/status', reportController.updateReportStatus);

export default route;


