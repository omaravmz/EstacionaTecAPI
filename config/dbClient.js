import 'dotenv/config';
import mongoose from "mongoose";

class dbClient{

    constructor () {
        this.connectDB();
    }

    async connectDB (){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.SERVER_DB}/?appName=Cluster0`;
        await mongoose.connect(queryString, {
            dbName: 'EstacionaTecDB',
        });
        console.log('Connection to DB: Succesful');
     }

     async disconnectDB (){
        try {
            await mongoose.disconnect();
            console.log("Conexión a la base de datos cerrada");
        } catch (error) {
            console.error("Error al cerrar la conexión: ", e);
        }
     }
}

export default new dbClient();