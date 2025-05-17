// import {logEvents} from "./logEvents.js";
// import EventEmitter from 'events';

// class Emitter extends EventEmitter{};

// const myEmitter = new Emitter();

// myEmitter.on('log', (msg)=>logEvents(msg));

// setTimeout(()=>{
//     myEmitter.emit('log', 'Log event emitterd');
// }, 2000);

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { logger} from "./middlewares/logEvents.js";
import {errorHandler, notFound} from './middlewares/errorHandler.js';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import verifyJWT from './middlewares/verifyJWT.js';
import { ROLES_LIST } from './config/roles_list.js';
import { verifyRoles } from './middlewares/verifyRoles.js';
let port = process.env.PORT || 6969;

connectDB();
const app = express();
// custom  middleware logger
app.use(logger);

// Cross Origin Resource Sharing
// Only allow the url in the whitelist to access the backend.
// Remove the 'http://127.0.0.1:5500', 'http://localhost:8080' and || !origin on Production

const whitelist = ['https://wwww.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:8080'];
const corsOptions={
    origin: (origin, callback)=>{
        if(whitelist.lastIndexOf(origin) !==-1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());



app.get('/', (req, res)=>{
    res.send('Hello from Express');
})

app.use('/api/auth', authRoutes);

// Protected route example
app.use('/api/protected', verifyJWT, verifyRoles(ROLES_LIST.Amdin), (req, res) => {
  res.json({ message: `Hello user ${req.userId}, this is protected.` });
});


app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log('Server is runinng on port' , port));






