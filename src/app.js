import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

// import indexRouter from './routes/index';


dotenv.config()


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./routes')(app);



app.use(express.static(path.join(__dirname, '../public')));

export default app;