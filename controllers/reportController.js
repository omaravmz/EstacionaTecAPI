import { request, response } from 'express';
import mongoose from "mongoose";
import reportModel from '../models/reportModel.js'

class reportController {
    constructor () {

    }

    async getAll(req, res) {
        try {
            const data = await reportModel.getAll();
            res.status(200).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async createReport(req, res) {
        try {
            const data = await reportModel.createReport(req.body);
            res.status(200).json(data);
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

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid report ID" });
            }
            
            const data = await reportModel.updateReportStatus(id, status);

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
            const data = await reportModel.removeReport(id);
            res.status(206).json(data);
        } catch(error) {
            res.status(500).send(error);
        }
    } 

}

export default new reportController();