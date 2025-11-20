import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    spot_num: {
      type: String,
      required: true
    },
    entry_time: {
      type: Date,
      required: true
    },
    exit_time: {
      type: Date,
      default: null
    },
    duration: {
      type: Number, 
      default: null
    },
    status: {
      type: String,
      enum: ["occupied", "completed"],
      default: "occupied"
    }
  }, { timestamps: true }

);

eventSchema.index({ spot_num: 1, status: 1 });

export default mongoose.model('events', eventSchema);
