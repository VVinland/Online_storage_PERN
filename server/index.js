import path from 'path';
import express from 'express';
import dotenv from "dotenv"
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { sequelize } from './db.js';
import {
    User,
    Basket,
    Rating,
    BasketDevice,
    Device,
    DeviceInfo,
    Type,
    TypeBrand,
    Brand
} from './models/models.js';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandlingMiddleware.js';


dotenv.config()
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname + '/static')));
app.use(fileUpload({}));
app.use('/api', router);


app.use(errorHandler);


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync();
        app.listen(PORT, () => { console.log(`${PORT}`) });
    } catch (error) {
        console.log(error);
    }
}

start();
