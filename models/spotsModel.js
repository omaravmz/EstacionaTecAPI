import mongoose from 'mongoose';
import Spot from '../schema/spotsSchema.js';

class spotsModel {
    
    async getAll(){
        return await Spot.find();
    }

    async getSpot(id){
        return await Spot.findById(id);
    }

    async addSpot(spot){
        return await Spot.create(spot);
    }

    async updateSpot(id, spot){
        return await Spot.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, spot, {new: true});
    }

    async updateSpotStatus(id, status){
        return await Spot.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, { status }  , {new: true});
    }

    async removeSpot(id){
        return await Spot.findOneAndDelete( {_id: new mongoose.Types.ObjectId(id)});
    }

    async getStatusCount() {
        const counts = await Spot.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const result = { available: 0, occupied: 0, blocked: 0, total: 0 };
        counts.forEach(c => {
            result[c._id] = c.count;
            result.total += c.count;
        });

        return result;
    }

    async getSpotsAvailable() {
        return await Spot.find({ status: "available" });
    }

    async getSpotsOccupied() {
        return await Spot.find({ status: "occupied" });
    }

}

export default new spotsModel();