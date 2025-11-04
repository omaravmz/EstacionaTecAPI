import { request, response } from 'express';
import spotsModel from '../models/spotsModel.js'

class spotsController {
    constructor () {

    }

    async getAll(req, res) {
        try {
            res.status(201).json({ status: 'get-all ok'});
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async getSpot(req, res) {
        try {
            res.status(201).json({ status: 'get-one ok'});
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async addSpot(req, res) {
        try {
            const data = await spotsModel.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            console.error('❌ Error en addSpot:', error);
            res.status(500).json({ message: 'Error interno', error: error.message });
        }
    }

    async updateSpot(req, res) {
        try {
            res.status(201).json({ status: 'update ok'});
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async updateSpotStatus(req, res) {
        try {
            res.status(201).json({ status: 'update-status ok'});
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async removeSpot(req, res) {
        try {
            res.status(201).json({ status: 'delete ok'});
        } catch(error) {
            res.status(500).send(error);
        }
    }
}

export default new spotsController();