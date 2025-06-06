import express from 'express';
import User from '../models/userModel.js';
import {getAllDoctors, getDoctorDetailById, saveDoctorInfor, getScheduleListByDoctorIDAndDate,
    getScheduleDetailByDoctorID} from '../controllers/doctorController.js';

    
const router = express.Router();

router.get('/get-doctor-list', getAllDoctors);
router.get('/get-doctor-detail-by-id', getDoctorDetailById);
router.post('/save-doctor-infor',  saveDoctorInfor);
router.get('/get-schedule-list-by-doctorID-date', getScheduleListByDoctorIDAndDate);
router.get('/get-schedule-detail-by-doctorID', getScheduleDetailByDoctorID);


export default router;