import express from 'express';
import User from '../models/userModel.js';
import {getAllDoctors} from '../controllers/doctorController.js'
const router = express.Router();

router.get('/get-doctor-list', getAllDoctors);

export default router;