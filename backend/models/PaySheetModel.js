import mongoose from 'mongoose';




const userSchema = mongoose.Schema(
  {
  
  


  date: {
    type: String,
    
  },
  totalAmount: {
    type: Number,
    
  },

  },
  {
    timestamps: true,
  }
);



const PaySheet = mongoose.model('PaySheet', userSchema);

export default PaySheet;
