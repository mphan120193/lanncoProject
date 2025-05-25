import User from '../models/userModel.js';







const getAllusers = (async (req, res) => {





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
    console.log(e)
  }








});

export { getAllusers };