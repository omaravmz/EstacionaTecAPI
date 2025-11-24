import { Router } from "express";
import statsController from "../controllers/statsController.js";

const route = Router();

// Porcentaje de ocupación total
route.get("/status-count", (req, res) => statsController.getStatusCount(req, res));

// Eventos agrupados por día
route.get("/events-by-day", (req, res) => statsController.getEventsByDay(req, res));

// Ocupación por zona
route.get("/zone-occupancy", (req, res) => statsController.getZoneOccupancy(req, res));

// Zonas más usadas en los últimos 7 días
route.get("/most-used-zones", (req, res) => statsController.getMostUsedZones(req, res));

// Duración promedio de estacionamiento
route.get("/average-duration", (req, res) => statsController.getAverageDuration(req, res));

// Horas pico (param opcional: ?days=7)
route.get("/peak-hours", (req, res) => statsController.getPeakHours(req, res));

export default route;
