import { request, response } from 'express';
import sensorModel from '../models/sensorModel.js'

class sensorController {
    constructor () {

    }

    async getAll(req, res) {
        try {
            const data = await sensorModel.getAll();
            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async getSensor(req, res) {
        try {
            const { sensor_ID } = req.params;
            const data = await sensorModel.getSensor(sensor_ID);

            if (!data) {
                return res.status(404).json({ error: 'Sensor no encontrado', sensor_ID });
            }

            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async addSensor(req, res) {
        try {
            const data = await sensorModel.addSensor(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateSensor(req, res) {
        try {
            const { sensor_ID } = req.params;
            const data = await sensorModel.updateSensor(sensor_ID, req.body);
            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async updateSensorStatus(req, res) {
        try {
            const { sensor_ID } = req.params;
            const { status } = req.body;

            const validStatuses = ["active", "unactive"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: "Invalid status value" });
            }

            const data = await sensorModel.updateSensorStatus(sensor_ID, status);

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
            const { sensor_ID } = req.params;
            const data = await sensorModel.removeSensor(sensor_ID);
            res.status(206).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async getStatusCount(req, res) {
        try {
            const counts = await sensorModel.getStatusCount();
            res.status(200).json(counts);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSensorsActive(req, res) {
        try {
            const data = await sensorModel.getSensorsActive();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSensorsUnactive(req, res) {
        try {
            const data = await sensorModel.getSensorsUnactive();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }    

}

export default new sensorController();