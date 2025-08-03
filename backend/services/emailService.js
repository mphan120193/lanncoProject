import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

const emailSecretPath = '/run/secrets/EMAIL_USER';
if (fs.existsSync(emailSecretPath)) {
    process.env.EMAIL_USER = fs.readFileSync(emailSecretPath, 'utf8').trim();
}

const passSecretPath = '/run/secrets/EMAIL_PASS';
if (fs.existsSync(passSecretPath)) {
    process.env.EMAIL_PASS = fs.readFileSync(passSecretPath, 'utf8').trim();
}




const transporter = nodemailer.createTransport({
    service: "gmail", // Use "gmail" or SMTP provider (e.g., SendGrid, Mailgun)
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password (not your regular password)
    },
});

const sendEmail = async (to, subject, text, html) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html, // Can send HTML emails
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};










export { sendEmail };