import mongoose from 'mongoose';
import Sensor from '../schema/sensorSchema.js';

class sensorModel {
    
    async getAll(){
        return await Sensor.find();
    }

    async getSensor(sensor_ID){
        return await Sensor.findOne( { sensor_ID: sensor_ID } );
    }

    async addSensor(sensor){
        return await Sensor.create(sensor);
    }

    async updateSensor(sensor_ID, sensor){
        return await Sensor.findOneAndUpdate( {sensor_ID: sensor_ID}, sensor, {new: true});
    }

    async updateSensorStatus(sensor_ID, status){
        return await Sensor.findOneAndUpdate( {sensor_ID: sensor_ID}, { status }  , {new: true});
    }

    async removeSensor(sensor_ID){
        return await Sensor.findOneAndDelete( {sensor_ID: sensor_ID} );
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

export default new sensorModel();