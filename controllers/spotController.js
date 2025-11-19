import { request, response } from 'express';
import spotModel from '../models/spotModel.js'

class spotController {
    constructor () {

    }

    async getAll(req, res) {
        try {
            const data = await spotModel.getAll();
            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async getSpot(req, res) {
        try {
            const { spot_num } = req.params;
            const data = await spotModel.getSpot(spot_num);
            
            if (!data) {
                return res.status(404).json({ error: 'Spot no encontrado', spot_num });
            }

            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async addSpot(req, res) {
        try {
            const data = await spotModel.addSpot(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateSpot(req, res) {
        try {
            const { spot_num } = req.params;
            const data = await spotModel.updateSpot(spot_num, req.body);
            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async updateSpotStatus(req, res) {
        try {
            const { spot_num } = req.params;
            const { status } = req.body;

            const validStatuses = ["available", "occupied", "blocked"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: "Invalid status value" });
            }

            const data = await spotModel.updateSpotStatus(spot_num, status);

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
            const { spot_num } = req.params;
            const data = await spotModel.removeSpot(spot_num);
            res.status(206).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async getStatusCount(req, res) {
        try {
            const counts = await spotModel.getStatusCount();
            res.status(200).json(counts);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSpotsAvailable(req, res) {
        try {
            const data = await spotModel.getSpotsAvailable();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getSpotsOccupied(req, res) {
        try {
            const data = await spotModel.getSpotsOccupied();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }    

}

export default new spotController();