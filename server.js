import express from 'express';
import 'dotenv/config';
import dbClient from './config/dbClient.js';
import mqttClient from "./config/mqttClient.js";

import userRoutes from './routes/user.js';
import spotRoutes from './routes/spot.js';
import sensorRoutes from './routes/sensor.js'
import reportRoutes from './routes/report.js'
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js"
import statsRoutes from "./routes/stats.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/spots', spotRoutes);
app.use('/sensors', sensorRoutes);
app.use('/reports', reportRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/stats", statsRoutes);

try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
    });

} catch(error) {
    console.log(error);
}

process.on('SIGINT', async () => {
    dbClient.disconnectDB();
    process.exit(0);
});