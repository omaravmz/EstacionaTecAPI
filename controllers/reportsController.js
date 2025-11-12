import { request, response } from 'express';
import reportsModel from '../models/reportsModel.js'

class reportsController {
    constructor () {

    }

    async getAll(req, res) {
        try {
            const data = await reportsModel.getAll();
            res.status(201).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async createReport(req, res) {
        try {
            const data = await reportsModel.createReport(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateReportStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const validStatuses = ["pending", "resolved"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: "Invalid status value" });
            }

            const data = await reportsModel.updateReportStatus(id, status);

            if (!data) {
                return res.status(404).json({ error: "Report not found" });
            }

            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async removeReport(req, res) {
        try {
            const { id } = req.params;
            const data = await reportsModel.removeReport(id);
            res.status(206).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    } 

}

export default new reportsController();