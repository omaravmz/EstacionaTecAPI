import { MongoClient } from "mongodb";

class dbClient{
    constructor (){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.SERVER_DB}/?appName=Cluster0`;
        this.client = new MongoClient(queryString);
        this.DBconnect();
     }

    async DBconnect() {
        try {
            await this.client.connect();
            this.db = this.client.db('MiDB');
            console.log("Succesful")
        } catch (error) {
            console.log(error);
        }
    }
}

export default new dbClient;