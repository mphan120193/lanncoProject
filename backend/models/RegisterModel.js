import mongoose from 'mongoose';




const userSchema = mongoose.Schema(
  {
  
  
    date: {
      type: String,
      
    },

  customerName: {
    type: String,
    
  },
  jobNumber: {
    type: String,
    
  },
  jobName: {
    type: String,
    
  },
  projectValue: {
    type: String,
    
  },
  chargeFee: {
    type: String,
    
  },
  invoiceNumber: {
    type: String,
    
  },
  note: {
    type: String,
    
  },
  status: {
    type: String,
    
  },

  },
  {
    timestamps: true,
  }
);



const Register = mongoose.model('Register', userSchema);

export default Register;
