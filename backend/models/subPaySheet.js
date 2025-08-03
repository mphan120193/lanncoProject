import mongoose from 'mongoose';




const userSchema = mongoose.Schema(
  {
  
  


  paySheetId: {
    type: String,
    
  },
  amount: {
    type: String,
    
  },
  invoiceNumber: {
    type: String,
    
  },

  },
  {
    timestamps: true,
  }
);



const subPaySheet = mongoose.model('subPaySheet', userSchema);

export default subPaySheet;
