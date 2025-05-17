import User from '../models/userModel.js';
import { v4 as uuidv4 } from "uuid";



const registerUser = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, password,
      address, roleID, phoneNumber, genderID, positionID } = req.body;
  
  
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      address,
      roleID,
      phoneNumber,
      genderID,
      positionID,
  
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        roleId: user.roleID,
  
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });