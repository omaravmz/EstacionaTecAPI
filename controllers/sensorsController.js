import { request, response } from 'express';
import sensorsModel from '../models/sensorsModel.js'

class sensorsController {
    constructor () {

    }

    async getAll(req, res) {
        try {
            const data = await sensorsModel.getAll();
            res.status(201).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async getSensor(req, res) {
        try {
            const { id } = req.params;
            const data = await sensorsModel.getSensor(id);
            res.status(201).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async addSensor(req, res) {
        try {
            const data = await sensorsModel.addSensor(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateSensor(req, res) {
        try {
            const { id } = req.params;
            const data = await sensorsModel.updateSensor(id, req.body);
            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async updateSensorStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const validStatuses = ["active", "unactive"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: "Invalid status value" });
            }

            const data = await sensorsModel.updateSensorStatus(id, status);

            if (!data) {
                return res.status(404).json({ error: "Sensor not found" });
            }

            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async removeSensor(req, res) {
        try {
            const { id } = req.params;
            const data = await sensorsModel.removeSensor(id);
            res.status(206).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async getStatusCount(req, res) {
        try {
            const counts = await sensorsModel.getStatusCount();
            res.status(200).json(counts);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSensorsActive(req, res) {
        try {
            const data = await sensorsModel.getSensorsActive();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSensorsUnactive(req, res) {
        try {
            const data = await sensorsModel.getSensorsUnactive();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }    

}

export default new sensorsController();