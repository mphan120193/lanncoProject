import express from 'express';



import { getRegisterList, createRegister, deleteRegister, EditRegister, getRegisterListByDate,
    createPaySheet, getPaySheet, deletePaySheet, editPaySheet, getPaySheetbyDate,
    createSubPaySheet, getSubPaySheet, deleteSubPaySheet } from '../controllers/lanncoController.js';

    
const router = express.Router();



router.get('/get-register',getRegisterList );
router.get('/get-register-byDate',getRegisterListByDate );
router.post('/create-register',createRegister );
router.delete('/delete-register', deleteRegister);
router.put('/edit-register', EditRegister);

router.get('/get-paysheet', getPaySheet );
router.get('/get-paysheet-byDate', getPaySheetbyDate );
router.post('/create-paysheet',createPaySheet );
router.delete('/delete-paysheet', deletePaySheet);
router.put('/edit-paysheet', editPaySheet);

router.post('/create-sub-paysheet',createSubPaySheet)
router.get('/get-sub-paysheet',getSubPaySheet)
router.delete('/delete-sub-paysheet', deleteSubPaySheet);






export default router;