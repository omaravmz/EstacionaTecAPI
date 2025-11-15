import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
    
    createdAt: { 
        type: Date, 
        default: Date.now 
    }

    },
);

export default mongoose.model('users', usersSchema);