import express from 'express';
import 'dotenv/config';
import dbClient from './config/dbClient.js';
import usersRoutes from './routes/users.js';
import spotsRoutes from './routes/spots.js';
import sensorsRoutes from './routes/sensors.js'
import reportsRoutes from './routes/reports.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoutes);
app.use('/spots', spotsRoutes);
app.use('/sensors', sensorsRoutes);
app.use('/reports', reportsRoutes);

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