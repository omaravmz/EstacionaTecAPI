import mongoose from 'mongoose';
import Spot from '../schema/spotsSchema.js';

class spotsModel {
    
    async getAll(){
        return await Spot.find();
    }

    async getSpot(spot_num){
        return await Spot.findOne( { spot_num: spot_num } );
    }

    async addSpot(spot){
        return await Spot.create(spot);
    }

    async updateSpot(spot_num, spot){
        return await Spot.findOneAndUpdate( { spot_num: spot_num } , spot, {new: true});
    }

    async updateSpotStatus(spot_num, status){
        return await Spot.findOneAndUpdate( { spot_num: spot_num }, { status }  , {new: true});
    }

    async removeSpot(spot_num){
        return await Spot.findOneAndDelete( { spot_num: spot_num } );
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