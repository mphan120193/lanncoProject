import User from "../models/userModel.js";


const getAllDoctors = async(req, res)=>{
    try {
        const doctors = await User.find({ roleID: 'R2' }).select('-password -image');
        if (doctors) {
            return res.status(200).json(
                {data:doctors}
            )

        } else {
            res.status(200).json({
                message: 'Doctor not found'
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            message: 'Error from server'
        })

    }

}

export {
    getAllDoctors
}