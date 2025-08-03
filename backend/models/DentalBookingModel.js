import mongoose from 'mongoose';




const DentalBookingModel = mongoose.Schema(
    {
        statusID: {
            type: String,
            required: false,
        },
        doctorID: {
            type: String,
            required: false,
        },
        patientID: {
            type: String,
            required: false,

        },
        date: {
            type: String,
            required: false,

        },
        timeType: {
            type: String,
            required: false,

        },
        name: {
            type: String,
            required: false,

        },
        phoneNmber: {
            type: String,
            required: false,

        },

        email: {
            type: String,
            required: false,

        },

        message: {
            type: String,
            required: false,

        },
        

        confirmToken: {
            type: String,
            required: false,

        },




    },
    {
        timestamps: true,
    }
);



const DentalBooking = mongoose.model('DentalBooking', DentalBookingModel);

export default DentalBooking;
