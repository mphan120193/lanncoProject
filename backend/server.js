
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {errorHandler, notFound} from './middlewares/errorHandler.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import verifyJWT from './middlewares/verifyJWT.js';
import lanncoRoutes from './routes/lanncoRoutes.js'
let port = process.env.PORT || 6969;

connectDB();
const app = express();

const whitelist = ['https://wwww.yoursite.com', 'http://127.0.0.1:5173', 'http://localhost:5173', 
'http://127.0.0.1:3000', 'http://localhost:3000',
];
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

// Use to check backend when running with docker.
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use('/api/auth', authRoutes);
app.use('/api/lannco',verifyJWT, lanncoRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log('Server is runinng on port' , port));






