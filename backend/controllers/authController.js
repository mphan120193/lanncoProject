import User from '../models/userModel.js';

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";

import dotenv from 'dotenv';
dotenv.config();





const port = process.env.CONFIRM_URL;


const getAllusers = (async (req, res) => {

  const id = req.query.id;

  if (id) {

    const user = await User.find({ _id: id }).select('-password');
    if (user) {

      res.status(200).json(user);

    } else {
      res.status(200).json({ message: "No users found" });
    }
  }
  else {
    try {
      const allUsers = await User.find({}).select(' -password -image');

      if (allUsers) {
        res.status(200).json(
          allUsers
        )

      } else {
        res.status(200).json({ message: "No users found" });

      }


    } catch (e) {
      res.status(200).json({ message: "Error from Server..." });
      console.log(e)
    }


  }












});

const deleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      message: "Missing id delete"
    })
  }

  try {
    let user = await User.find({ _id: req.body.id });
    if (!user) {
      res.status(200).json({ message: "user is not exist" })
    }
    else {
      await User.deleteOne({ _id: req.body.id });
      res.status(200).json({ message: "user is delete!" })

    }




  } catch (e) {
    console.log(e)
  }


};



const createUser = async (req, res) => {

  const { firstName, lastName, email, password,
    address, phoneNumber, roleID, genderID, positionID, image } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);





  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    address,
    roles: roleID,
    genderID,
    image,
    phoneNumber,
    positionID,


  });
  if (user) {
    res.status(200).json({ message: 'User is created!!' })
  }

}

const editUser = async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.image = req.body.image || user.image;



    const updatedUser = await user.save();

    res.status(200).json({
      message: "Updated successfully",
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      address: updatedUser.address,

    });
  } else {
    res.status(404).json({ message: 'User not found' });

  }
}






export {
  getAllusers, deleteUser, createUser, editUser,
  
};