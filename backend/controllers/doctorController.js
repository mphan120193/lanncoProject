import User from "../models/userModel.js";
import { ROLES_LIST } from "../config/roles_list.js";
import mongoose from 'mongoose';
import DoctorInfor from '../models/doctorInfoModel.js';
import Markdown from '../models/markdownModel.js';
import DentalBooking from '../models/DentalBookingModel.js';
import doctorSchedule from '../models/doctorScheduleModel.js';


const getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ roles: ROLES_LIST.Doctor.toString() }).select('-password -image');
        if (doctors) {
            return res.status(200).json(
                { data: doctors }
            )

        } else {
            res.status(200).json({
                message: 'Doctor not found'
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            message: 'Error from server'
        })

    }

}

const getDoctorDetailById = async (req, res) => {

    if (req.query.id) {
        try {


            let doctorInfo = await User.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(req.query.id) }, // Match User by _id (if you want a specific doctor)
                },
                {
                    $lookup: {
                        from: "markdowns",
                        let: { userId: '$_id' }, // Define a variable for the User's _id
                        pipeline: [
                            {
                                $addFields: { // Add a new ObjectId field to the Markdown documents
                                    doctorIdObjectId: { $toObjectId: '$doctorId' },
                                },
                            },
                            {
                                $match: { // Match the ObjectId fields
                                    $expr: { $eq: ['$doctorIdObjectId', '$$userId'] },
                                },
                            },
                        ],
                        as: 'markdowns',
                    },
                },
                {
                    $lookup: {
                        from: "doctorinfos",
                        let: { userId: '$_id' }, // Define a variable for the User's _id
                        pipeline: [
                            {
                                $addFields: {
                                    doctorIdObjectId: { $toObjectId: '$doctorID' },
                                },
                            },
                            {
                                $match: { // Match the ObjectId fields
                                    $expr: { $eq: ['$doctorIdObjectId', '$$userId'] },
                                },
                            },
                        ],
                        as: 'additionalDoctorinfo',
                    },
                },

                {
                    $project: { password: 0, }
                },
            ]);


            if (doctorInfo) {
                return res.status(200).json({
                    message: "Doctor Found",
                    doctorInfo,
                })

            } else {
                return res.status(200).json({
                    message: "No doctor found",
                    doctor: [],
                })
            }

        } catch (e) {
            console.log(e);
            return res.status(200).json({
                message: "Error Code From Server",
            })
        }
    } else {
        return res.status(200).json({
            message: "Missing parameters",
        })
    }
}
const saveDoctorInfor = async (req, res) => {
    const { id, description, content, contentHTML,
        price, payment, province, clinicName, clinicAddress, clinicNote } = req.body;

    try {

        if (!(id || content || contentHTML)) {
            res.json({ message: "missing doctor ID" })
        } else {

            const existingMarkdown = await Markdown.findOne({ doctorId: id });
            const existingDoctorInfo = await DoctorInfor.findOne({ doctorID: id })

            if (existingMarkdown) {
                await Markdown.findByIdAndUpdate(
                    existingMarkdown._id, // Use the _id of the existing document
                    {
                        content,
                        contentHTML,
                        description,
                        // doctorId: id,  No need to update doctorId, it should be the same
                    },
                    { new: true, runValidators: true } // Return the updated document, validate updates


                );

                //res.status(200).json({ message: "Updated Markdown successfully!" })
            }
            else {
                await Markdown.create(
                    {
                        content,
                        contentHTML,
                        description,
                        doctorId: id,


                    });
                //res.status(200).json({ message: "Markdown saved successfully!" })
            }

            if (existingDoctorInfo) {
                await DoctorInfor.findByIdAndUpdate(
                    existingDoctorInfo._id, {
                    priceID: price,
                    paymentID: payment,
                    provinceID: province,
                    clinicName: clinicName,
                    clinicAddress: clinicAddress,
                    note: clinicNote
                },
                    { new: true, runValidators: true });

                //res.status(200).json({ message: "Updated Doctor Infor successfully!" });

            } else {
                await DoctorInfor.create({
                    doctorID: id,
                    priceID: price,
                    paymentID: payment,
                    provinceID: province,
                    clinicName: clinicName,
                    clinicAddress: clinicAddress,
                    note: clinicNote
                })

                //res.status(200).json({ message: "New Doctor Infor successfully!" });
            }

            res.status(200).json({ message: "Markdown saved successfully!" })
        }



    } catch (error) {
        res.status(500).json({ error: 'Error saving content' });
    }

}

const getScheduleListByDoctorIDAndDate = async (req, res) => {

    let docID = req.query.doctorID;
    let datePick = req.query.selectedDate;

    try {
        let scheduleList = await DentalBooking.aggregate([
            {
                $match: { doctorID: docID, date: datePick }, // Match User by _id (if you want a specific doctor)
            },

            {
                $lookup: {
                    from: 'allcodes',             // The name of the 'allcodes' collection
                    localField: 'timeType',        // The field in the 'DentalBooking' documents
                    foreignField: 'key',           // The field in the 'allcodes' documents
                    as: 'timeTypeData'           // The name of the new array field to add
                }
            },

            {
                $lookup: {
                    from: 'allcodes',             // The name of the 'allcodes' collection
                    localField: 'statusID',        // The field in the 'DentalBooking' documents
                    foreignField: 'key',           // The field in the 'allcodes' documents
                    as: 'statusData'           // The name of the new array field to add
                }
            },
        ])

        if (scheduleList) {

            res.status(200).json(scheduleList);

        } else {
            res.status(200).json({
                message: 'Schedule List not found'
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            message: 'Error from server'
        })
    }
}
const getScheduleDetailByDoctorID = async (req, res) => {
    let docID = req.query.doctorID;
    let datePick = req.query.selectedDate;

    if (docID && datePick) {
        try {
            const result = await doctorSchedule.aggregate([
                { $match: { doctorID: docID, date: datePick } },
                {
                    $group: {
                        _id: "$doctorID",
                        totalAppointments: { $sum: 1 },
                        existingTimes: { $push: "$time" } // Collect all booked times
                    }
                }
            ]);

            // Extract results
            const data = result[0] || { totalAppointments: 0, existingTimes: [] }
            //console.log('Extract schedule of the doctor on DB: ', data);
            let existingTime

            existingTime = data.existingTimes;



            
            return res.status(200).json({
                message: "Respone successfull!",
                existingTime: existingTime
            })

        } catch (e) {
            console.log(e);
            return res.status(200).json({
                message: 'Error from server'
            })
        }

    } else {
        res.status(200).json({
            message: "Missing parameters from client!"
        })
    }
}

export {
    getAllDoctors,
    getDoctorDetailById,
    saveDoctorInfor,
    getScheduleListByDoctorIDAndDate,
    getScheduleDetailByDoctorID
}