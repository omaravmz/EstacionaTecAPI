import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    spot_num: {
        type: String,
        required: false,
    },
    user_ID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [
            'pending', 'resolved'
        ],
        default: 'pending'
    }

    }, { timestamps: true}

);

export default mongoose.model('reports', reportSchema);