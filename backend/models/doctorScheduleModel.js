import mongoose from 'mongoose';




const doctorScheduleModel = mongoose.Schema(
  {
    doctorID: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
      
    },
    // userID: {
    //   type: String,
    //   required: false,
      
    // },
    // name: {
    //   type: String,
    //   required: false,
      
    // },
    // phoneNumber: {
    //   type: String,
    //   required: false,
      
    // },
    // email: {
    //   type: String,
    //   required: false,
      
    // },

    // message: {
    //   type: String,
    //   required: false,
      
    // },

    currentNumber: {
      type: Number,
      required: false,
      
    },

    maxNumber: {
      type: Number,
      required: false,
      
    },
    
    
  },
  {
    timestamps: true,
  }
);



const doctorSchedule = mongoose.model('doctorSchedule', doctorScheduleModel);

export default doctorSchedule;
