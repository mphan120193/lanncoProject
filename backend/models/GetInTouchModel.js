import mongoose from 'mongoose';




const GetInTouchModel = mongoose.Schema(
    {
        statusID: {
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



const GetInTouch = mongoose.model('GetInTouch', GetInTouchModel);

export default GetInTouch;
