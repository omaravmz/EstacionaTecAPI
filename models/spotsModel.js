import dbClient from "../config/dbClient.js"

class spotsModel {
    
    async create(spot) {
        const colSpots = dbClient.db.collection('spots');
        return await colSpots.insertOne(spot);
    }
}

export default new spotsModel;