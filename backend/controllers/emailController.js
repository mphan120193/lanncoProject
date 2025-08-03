import { sendEmail } from '../services/emailService.js';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';



const secretPath = '/run/secrets/CONFIRM_URL';
if (fs.existsSync(secretPath)) {
  process.env.CONFIRM_URL = fs.readFileSync(secretPath, 'utf8').trim();
}







const port = process.env.CONFIRM_URL;
//const getInTouchPort = process.env.CONFIRM_GET_IN_TOUCH_URL;

export const sendTestEmail = async (req, res) => {
  try {
    //console.log('Data From Client ', req.body)
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
};



export const sendGetInTouchEmail = async (req, res) => {
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

    // <br></br> Please click the link belove to confrim ... <br></br>
    // <a href="${getInTouchPort}${responseDetail.confirmToken}" >Click Here</a>`
    // ;

    await sendEmail(to, subject, message, htmlContent);

    res.status(200).json({ success: true, message: "Email sent successfully! ✅" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
