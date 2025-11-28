import mongoose from "mongoose";

const spotSchema = new mongoose.Schema({
    spot_num: {
        type: String,
        required: true,
        unique: true
    },
    zone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [
            'occupied', 'available', 'blocked'
        ]
    },
    sensor_ID: {
        type: String,
        required: true,
        unique: true
    },
    parking_incident: {
      type: String,
      enum: ["none", "badparking"],
      default: "none",
      required: true,
    }
    }, { timestamps: true}

);

export default mongoose.model('spots', spotSchema);