import { Router } from "express";
import statsController from "../controllers/statsController.js";

const route = Router();

route.get("/status-count", (req, res) => statsController.getStatusCount(req, res));
route.get("/events-by-day", (req, res) => statsController.getEventsByDay(req, res));
route.get("/zone-occupancy", (req, res) => statsController.getZoneOccupancy(req, res));
route.get("/most-used-zones", (req, res) => statsController.getMostUsedZones(req, res));
route.get("/average-duration", (req, res) => statsController.getAverageDuration(req, res));
route.get("/peak-hours", (req, res) => statsController.getPeakHours(req, res));
route.get("/bad-parking-spots", (req, res) => statsController.getBadParkingSpots(req, res));

export default route;
