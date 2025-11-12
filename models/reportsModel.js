import mongoose from 'mongoose';
import Report from '../schema/reportsSchema.js';

class reportsModel {
    
    async getAll(){
        return await Report.find();
    }

    async createReport(report){
        return await Report.create(report);
    }

    async updateReportStatus(id, status){
        return await Report.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, { status }  , {new: true});
    }

    async removeReport(id){
        return await Report.findOneAndDelete( {_id: new mongoose.Types.ObjectId(id)});
    }

}

export default new reportsModel();