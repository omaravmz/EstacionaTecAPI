import { request, response } from 'express';
import spotsModel from '../models/spotsModel.js'

class spotsController {
    constructor () {

    }

    async getAll(req, res) {
        try {
            const data = await spotsModel.getAll();
            res.status(201).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async getSpot(req, res) {
        try {
            const { id } = req.params;
            const data = await spotsModel.getSpot(id);
            res.status(201).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async addSpot(req, res) {
        try {
            const data = await spotsModel.addSpot(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateSpot(req, res) {
        try {
            const { id } = req.params;
            const data = await spotsModel.updateSpot(id, req.body);
            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async updateSpotStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const validStatuses = ["available", "occupied", "blocked"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: "Invalid status value" });
            }

            const data = await spotsModel.updateSpotStatus(id, status);

            if (!data) {
                return res.status(404).json({ error: "Spot not found" });
            }

            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async removeSpot(req, res) {
        try {
            const { id } = req.params;
            const data = await spotsModel.removeSpot(id);
            res.status(206).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async getStatusCount(req, res) {
        try {
            const counts = await spotsModel.getStatusCount();
            res.status(200).json(counts);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSpotsAvailable(req, res) {
        try {
            const data = await spotsModel.getSpotsAvailable();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSpotsOccupied(req, res) {
        try {
            const data = await spotsModel.getSpotsOccupied();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }    

}

export default new spotsController();