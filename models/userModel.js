import mongoose from 'mongoose';
import User from '../schema/userSchema.js';

class userModel {
    
    async getAll(){
        return await User.find();
    }

    async getUserById(id){
        return await User.findById(id);
    }

    async getUser(filter){
        return await User.findOne(filter);
    }

    async addUser(user){
        return await User.create(user);
    }

    async updateUser(id, user){
        return await User.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)},  user , {new: true});
    }

    async deleteUser(id){
        return await User.findOneAndDelete( {_id: new mongoose.Types.ObjectId(id)});
    }

}

export default new userModel();