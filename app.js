import express from 'express';
import 'dotenv/config';
import spotsRoutes from './routes/spots.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/spots', spotsRoutes);


try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
    });

} catch(error) {
    console.log(error);
}