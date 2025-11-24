import { request, response } from 'express';
import spotModel from "../models/spotModel.js";
import eventModel from "../models/eventModel.js";

class StatsController {

    // -------------------------------
    // 1. Porcentaje de ocupación global
    // -------------------------------
    async getStatusCount(req, res) {
        try {
            const data = await spotModel.getStatusCount();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error in getStatusCount:", error);
            return res.status(500).json({ error: "Error retrieving status count" });
        }
    }

    // -------------------------------
    // 2. Eventos agrupados por día
    // -------------------------------
    async getEventsByDay(req, res) {
        try {
            const data = await eventModel.getEventsByDay();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error in getEventsByDay:", error);
            return res.status(500).json({ error: "Error retrieving events by day" });
        }
    }

    // -------------------------------
    // 3. Ocupación por zona
    // -------------------------------
    async getZoneOccupancy(req, res) {
        try {
            const data = await spotModel.getZoneOccupancy();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error in getZoneOccupancy:", error);
            return res.status(500).json({ error: "Error retrieving zone occupancy" });
        }
    }

    // -------------------------------
    // 4. Zonas más usadas últimos 7 días
    // -------------------------------
    async getMostUsedZones(req, res) {
        try {
            const data = await eventModel.getMostUsedZones();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error in getMostUsedZones:", error);
            return res.status(500).json({ error: "Error retrieving most used zones" });
        }
    }

    // -------------------------------
    // 5. Duración promedio
    // -------------------------------
    async getAverageDuration(req, res) {
        try {
            const data = await eventModel.getAverageDuration();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error in getAverageDuration:", error);
            return res.status(500).json({ error: "Error retrieving average duration" });
        }
    }

    // -------------------------------
    // 6. Horas pico (param: ?days=7)
    // -------------------------------
    async getPeakHours(req, res) {
        try {
            let { days } = req.query;

            if (days !== undefined) {
                days = parseInt(days);
                if (isNaN(days) || days <= 0) {
                    return res.status(400).json({ error: "Parameter 'days' must be a positive number" });
                }
            } else {
                days = 7; // default
            }

            const data = await eventModel.getPeakHours(days);
            return res.status(200).json(data);

        } catch (error) {
            console.error("Error in getPeakHours:", error);
            return res.status(500).json({ error: "Error retrieving peak hours" });
        }
    }
}

export default new StatsController();
