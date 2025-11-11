import mongoose from 'mongoose';
import Sensor from '../schema/sensorsSchema.js';

class sensorsModel {
    
    async getAll(){
        return await Sensor.find();
    }

    async getSensor(id){
        return await Sensor.findById(id);
    }

    async addSensor(sensor){
        return await Sensor.create(sensor);
    }

    async updateSensor(id, sensor){
        return await Sensor.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, sensor, {new: true});
    }

    async updateSensorStatus(id, status){
        return await Sensor.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, { status }  , {new: true});
    }

    async removeSensor(id){
        return await Sensor.findOneAndDelete( {_id: new mongoose.Types.ObjectId(id)});
    }

    async getStatusCount() {
        const counts = await Sensor.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const result = { active: 0, unactive: 0, total: 0 };
        counts.forEach(c => {
            result[c._id] = c.count;
            result.total += c.count;
        });

        return result;
    }

    async getSensorsActive() {
        return await Sensor.find({ status: "active" });
    }

    async getSensorsUnactive() {
        return await Sensor.find({ status: "unactive" });
    }

}

export default new sensorsModel();