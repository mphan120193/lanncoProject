import User from '../models/userModel.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import Allcodes from '../models/allcodesModel.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import GetInTouch from '../models/GetInTouchModel.js';
import { sendEmail } from '../services/emailService.js';
import DentalBooking from '../models/DentalBookingModel.js';
import DoctorSchedule from '../models/doctorScheduleModel.js';
import dotenv from 'dotenv';
dotenv.config();





const port = process.env.CONFIRM_URL;


const getAllusers = (async (req, res) => {

  const id = req.query.id;

  if (id) {

    const user = await User.find({ _id: id }).select('-password');
    if (user) {

      res.status(200).json(user);

    } else {
      res.status(200).json({ message: "No users found" });
    }
  }
  else {
    try {
      const allUsers = await User.find({}).select(' -password -image');

      if (allUsers) {
        res.status(200).json(
          allUsers
        )

      } else {
        res.status(200).json({ message: "No users found" });

      }


    } catch (e) {
      console.log(e)
    }


  }












});

const deleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      message: "Missing id delete"
    })
  }

  try {
    let user = await User.find({ _id: req.body.id });
    if (!user) {
      res.status(200).json({ message: "user is not exist" })
    }
    else {
      await User.deleteOne({ _id: req.body.id });
      res.status(200).json({ message: "user is delete!" })

    }




  } catch (e) {
    console.log(e)
  }


};

const getAllCode = async (req, res) => {

  const inputType = req.query.type;

  if (inputType) {

    const allcode = await Allcodes.find({ type: inputType });

    res.status(200).json({ allcode });


  } else {
    res.status(404).json({ message: "Missing type of codes" })
  }

}

const createUser = async (req, res) => {

  const { firstName, lastName, email, password,
    address, phoneNumber, roleID, genderID, positionID, image } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);





  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    address,
    roles: roleID,
    genderID,
    image,
    phoneNumber,
    positionID,


  });
  if (user) {
    res.status(200).json({ message: 'User is created!!' })
  }

}

const editUser = async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.image = req.body.image || user.image;



    const updatedUser = await user.save();

    res.status(200).json({
      message: "Updated successfully",
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      address: updatedUser.address,

    });
  } else {
    res.status(404).json({ message: 'User not found' });

  }
}
const createGetInTouchMessage = async (req, res) => {

  const { name, phoneNumber, email, message } = req.body;


  try {

    const uniqueID = uuidv4();
    let messageRes = await GetInTouch.create({
      statusID: 'S1',
      name: name,
      phoneNmber: phoneNumber,
      email: email,
      message: message,
      confirmToken: uniqueID,
    });



    res.status(200).json({ messageRes });


  } catch (e) {
    console.log(e);
  }


}

const sendGetInTouchEmail = async (req, res) => {
  try {
    //console.log('Data From Client ', req.body)
    const { to, subject, message, messageDetail } = req.body;

    let name = messageDetail.name;
    let phoneNumber = messageDetail.phoneNumber;
    let email = messageDetail.email;
    let messageContent = messageDetail.message;


    //console.log(bookingResult.confirmToken);

    const htmlContent = `<h1>Welcome to Sunshine Dental</h1><p>Hello ${name}This is the confirm emal from 
    SunShine Dental. Thank you for contacting us. We will call you back soon.<br></br>
    Your contact information: <br></br>
    Phone Number : ${phoneNumber} <br></br>
    Email Address: ${email} <br></br>
    Your Message to us: ${messageContent} <br></br>
    </p>`;



    await sendEmail(to, subject, message, htmlContent);

    res.status(200).json({ success: true, message: "Email sent successfully! ✅" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}

const getAllCustomerMessage = async (req, res) => {

  try {
    let messageRes = await GetInTouch.find();
    if (messageRes) {
      res.status(200).json({ messageRes })
    }

  } catch (error) {

    console.log(error);
    res.status(200).json({
      message: 'Error From Server'
    })

  }
}

const updateStatusCustomerMessage = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      message: "Missing id delete"
    })
  }
  else {
    try {

      let updateMessage = await GetInTouch.findOne({ _id: req.body.id });

      if (updateMessage) {
        await GetInTouch.updateOne(
          { _id: req.body.id },
          { $set: { statusID: "S2" } }
        );
        return res.status(200).json({
          message: "success update status"
        })

      }

    } catch (e) {
      console.log(e);
      res.status(200).json({
        message: 'Error From Server'
      })
    }
  }
}

const bookAppointment = async (req, res) => {

  try {
    
    if (req.body) {
      const { doctorId, time, date, name, phoneNumber, email, message } = req.body;
      //console.log({ doctorId, time, date, name, phoneNumber, email, message });
      const userExists = await User.findOne({ email: email });
      if (!userExists) {
        const user = await User.create({
          firstName: name,
          lastName: 'Unknown',
          email: email,
          password: '123456',
          address: '',
          roleID: 'R3',
          phoneNumber: phoneNumber,


        });
        if (user) {

          const uniqueID = uuidv4();
          let result = await DentalBooking.create({
            statusID: 'S1',
            doctorID: doctorId,
            patientID: user._id,
            date: date,
            timeType: time,
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            message: message,
            confirmToken: uniqueID,
          });

          await DoctorSchedule.create({
            doctorID: doctorId,
            date: date,
            time: time,
          })


          res.status(200).json({
            message: 'New booking is created for a new patient!',
            result
          });

        }

      } else {
        const uniqueID = uuidv4();

        let result = await DentalBooking.create({
          statusID: 'S1',
          doctorID: doctorId,
          patientID: userExists._id,
          date: date,
          timeType: time,
          name: name,
          phoneNmber: phoneNumber,
          email: email,
          message: message,

          confirmToken: uniqueID,
        });

        await DoctorSchedule.create({
          doctorID: doctorId,
          date: date,
          time: time,
        })
        res.status(200).json({
          message: 'New booking is created for an existing patient!',
          result
        });

      }


    } else {
      res.status(200).json({
        message: 'Missing Booking Data'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: 'Error From Server'
    })
  }

}

const sendConfirmEmail = async (req, res)=>{

  try {
    const { to, subject, message, bookingDa, bookingResult } = req.body;

    let time=bookingDa.time;
    let date=bookingDa.date;
    let doctorID=bookingDa.doctorId;

    const htmlContent = `<h1>Welcome!</h1><p> ${message} This is the confirm emal from 
    Sunshine Dental. Your appointment is on ${date} at ${time} with doctor ${doctorID}</p>
    <br></br> Please click the link belove to confrim ... <br></br>
    <a href="${port}${bookingResult.confirmToken}&doctorID=${doctorID}" >Click Here</a>`
    ;
    await sendEmail(to, subject, message, htmlContent);

    res.status(200).json({ success: true, message: "Email sent successfully! ✅" });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const verifyEmail = async (req, res) =>{

  try {

    let token = req.body.token;
    let doctorID = req.body.doctorID;
    let appointmentExists = await DentalBooking.findOne({ confirmToken: token, doctorID: doctorID });

    if (appointmentExists) {
      let updateResult = await DentalBooking.updateOne(
          { confirmToken: token, doctorID: doctorID },
          { $set: { statusID: "S2" } }
      );
      res.status(200).json({
          message: 'Confirm an existing appointment successfull!',
          updateResult
      })

  }
    
        
        
    
  } catch (error) {
    console.log(error);
        res.status(200).json({
            message: 'Error From Server'
        })
  }
}





export {
  getAllusers, deleteUser, getAllCode, createUser, editUser,
  createGetInTouchMessage,
  sendGetInTouchEmail, getAllCustomerMessage, updateStatusCustomerMessage,
  bookAppointment, sendConfirmEmail, verifyEmail
};