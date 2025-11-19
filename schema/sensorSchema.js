import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    sensor_ID: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [
            'active', 'unactive'
        ],
    },
    type: {
        type: String,
        required: true,
        enum: [
            'ultrasonic', 'pressure'
        ],
    },
    spot_num: {
        type: String,
        required: true,
    }

    }, { timestamps: true}

);

export default mongoose.model('sensors', sensorSchema);