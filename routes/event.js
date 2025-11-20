import { Router } from 'express';
import eventController from '../controllers/eventController.js';

const route = Router();

route.post('/', eventController.createEvent);
route.put('/close/:spot_num', eventController.closeEvent);
route.get('/', eventController.getAll);
route.get('/spot/:spot_num', eventController.getEventsBySpot);
route.get('/spot/:spot_num/active', eventController.getActiveEventBySpot);

export default route;