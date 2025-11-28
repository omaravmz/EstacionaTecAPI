import mongoose from 'mongoose';
import Spot from '../schema/spotSchema.js';
import Event from "./eventModel.js";

class spotModel {
    
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

        const result = { 
            available: 0, 
            occupied: 0, 
            blocked: 0, 
            total: 0,
            occupancy_percentage: 0
        };

        counts.forEach(c => {
            result[c._id] = c.count;
            result.total += c.count;
        });

        if (result.total > 0) {
            result.occupancy_percentage = (result.occupied / result.total) * 100;
        }

        return result;
    }

    async getZoneOccupancy() {
        const data = await Spot.aggregate([
            {
                $group: {
                    _id: "$zone",
                    total: { $sum: 1 },
                    occupied: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "occupied"] }, 1, 0]
                        }
                    },
                    available: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "available"] }, 1, 0]
                        }
                    },
                    blocked: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "blocked"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    zone: "$_id",
                    _id: 0,
                    total_spots: "$total",
                    occupied: 1,
                    available: 1,
                    blocked: 1,
                    occupancy_percentage: {
                        $cond: [
                            { $eq: ["$total", 0] },
                            0,
                            { $multiply: [{ $divide: ["$occupied", "$total"] }, 100] }
                        ]
                    }
                }
            }
        ]);

        return data;
    }

    async getSpotsAvailable() {
        return await Spot.find({ status: "available" });
    }

    async getSpotsOccupied() {
        return await Spot.find({ status: "occupied" });
    }

    async updateParkingIncident(spot_num, incident) {
        try {
            return await Spot.findOneAndUpdate(
                { spot_num },
                { parking_incident: incident },
                { new: true }
            );
        } catch (error) {
            console.error("Error in updateParkingIncident:", error);
            throw error;
        }
    }
    
    async getBadParkingSpots() {
        try {
            return await Spot.find({ parking_incident: "badparking" });
        } catch (error) {
            console.error("Error in getBadParkingSpots:", error);
            throw error;
        }
    }

}

export default new spotModel();