import mongoose from 'mongoose';




const userSchema = mongoose.Schema(
  {
  
  


  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  refreshToken: { type: [String] },
  roles : {type: String}, 
  
  genderID: {
    type: String,
    required: false,
  },
  image: {
    type: Buffer,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  positionID: {
    type: String,
    required: false,
  },

  },
  {
    timestamps: true,
  }
);



const User = mongoose.model('User', userSchema);

export default User;
