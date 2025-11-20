import { request, response } from "express";
import eventModel from "../models/eventModel.js";

class eventController {
    constructor () {

    }

  async createEvent(req, res) {
    try {
      const { spot_num } = req.body;
      if (!spot_num) return res.status(400).json({ error: "spot_num is required" });

      const active = await eventModel.getActiveEventBySpot(spot_num);
      if (active) return res.status(200).json({ message: "Event already active", event: active });

      const event = await eventModel.createEvent(spot_num);

      return res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async closeEvent(req, res) {
    try {
      const { spot_num } = req.body;
      if (!spot_num) return res.status(400).json({ error: "spot_num is required" });

      const closed = await eventModel.closeEvent(spot_num);
      if (!closed) return res.status(404).json({ error: "No active event found for this spot" });

      return res.status(200).json(closed);
    } catch (error) {
      console.error("Error closing event:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const data = await eventModel.getAll();

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error getting events:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getEventsBySpot(req, res) {
    try {
      const { spot_num } = req.params;
      if (!spot_num) return res.status(400).json({ error: "spot_num is required" });

      const data = await eventModel.getEventsBySpotOrdered(spot_num);
      
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error getting events by spot:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getActiveEventBySpot(req, res) {
    try {
      const { spot_num } = req.params;
      if (!spot_num) return res.status(400).json({ error: "spot_num is required" });

      const active = await eventModel.getActiveEventBySpot(spot_num);
      if (!active) return res.status(404).json({ message: "No active event for this spot" });

      return res.status(200).json(active);
    } catch (error) {
      console.error("Error getting active event:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new eventController();
