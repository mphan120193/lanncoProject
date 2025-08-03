import Register from '../models/RegisterModel.js';
import PaySheet from '../models/PaySheetModel.js';
import subPaySheet from '../models/subPaySheet.js';



const getRegisterList = async (req, res) => {
    const id = req.query.id;
    try {
        if (id) {
            const register = await Register.findOne({ _id: id })
            if (register) {

                res.status(200).json(register);

            } else {
                res.status(200).json({ message: "No registers found" });
            }
        }
        else {
            const registerList = await Register.find({})
            if (registerList) {
                res.status(200).json(
                    registerList
                )

            } else {
                res.status(200).json({ message: "No registers found" });

            }
        }

    } catch (e) {
        console.log(e)
    }




}

const getRegisterListByDate = async (req, res) => {
    const { dateFrom, dateTo } = req.query;


    try {
        let query = {};

        // If only one date is provided
        if (dateFrom && !dateTo) {
            query.date = dateFrom;
        }

        // If both dateFrom and dateTo are provided, use $gte and $lte
        if (dateFrom && dateTo) {
            query.date = {
                $gte: dateFrom,
                $lte: dateTo
            };
        }

        const paySheetResult = await Register.find(query);

        if (paySheetResult && paySheetResult.length > 0) {
            return res.status(200).json(paySheetResult);
        } else {
            return res.status(200).json({ message: "No register found" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Server error" });
    }




}

const createRegister = async (req, res) => {
    const { date, customerName, jobNumber,
        jobName, projectValue, chargeFee,
        invoiceNumber, note, status } = req.body;

    const result = await Register.create({
        date,
        customerName, jobNumber,
        jobName, projectValue, chargeFee,
        invoiceNumber, note, status: 'o'
    })
    if (result) {
        res.status(200).json({ message: 'Register is created!!' })
    }
}

const deleteRegister = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            message: "Missing id delete"
        })
    }

    try {
        let deletedregister = await Register.find({ _id: req.body.id });
        if (!deletedregister) {
            res.status(200).json({ message: "user is not exist" })
        }
        else {
            await Register.deleteOne({ _id: req.body.id });
            res.status(200).json({ message: "register is delete!" })

        }




    } catch (e) {
        console.log(e)
    }


};

const EditRegister = async (req, res) => {


    const EditPaySheet = await Register.findById(req.body.id);

    if (EditPaySheet) {
        EditPaySheet.customerName = req.body.customerName || EditPaySheet.customerName;
        EditPaySheet.jobNumber = req.body.jobNumber || EditPaySheet.jobNumber;
        EditPaySheet.jobName = req.body.jobName || EditPaySheet.jobName;
        EditPaySheet.projectValue = req.body.projectValue || EditPaySheet.projectValue;
        EditPaySheet.chargeFee = req.body.chargeFee || EditPaySheet.chargeFee;
        EditPaySheet.invoiceNumber = req.body.invoiceNumber || EditPaySheet.invoiceNumber;
        EditPaySheet.note = req.body.note || EditPaySheet.note;
        EditPaySheet.status = req.body.status || EditPaySheet.status;







        await EditPaySheet.save();

        res.status(200).json({
            message: "Updated successfully"
        });
    } else {
        res.status(404).json({ message: 'Register not found' });

    }
}

const createPaySheet = async (req, res) => {

    const { date, totalAmount } = req.body;

    const result = await PaySheet.create({
        date,
        totalAmount: '0'
    })
    if (result) {
        res.status(200).json({ message: 'paySheet is created!!' })
    }
}

const getPaySheet = async (req, res) => {
    const id = req.query.id;
    try {
        if (id) {
            const paySheetResult = await PaySheet.findOne({ _id: id })
            if (paySheetResult) {

                res.status(200).json(paySheetResult);

            } else {
                res.status(200).json({ message: "No paySheet found" });
            }
        }
        else {
            const paySheetResults = await PaySheet.find({})
            if (paySheetResults) {
                res.status(200).json(
                    paySheetResults
                )

            } else {
                res.status(200).json({ message: "No paySheets found" });

            }
        }

    } catch (e) {
        console.log(e)
    }




}


const getPaySheetbyDate = async (req, res) => {
    

    const { dateFrom, dateTo } = req.query;
    

    try {
        let query = {};

        // If only one date is provided
        if (dateFrom && !dateTo) {
            query.date = dateFrom;
        }

        // If both dateFrom and dateTo are provided, use $gte and $lte
        if (dateFrom && dateTo) {
            query.date = {
                $gte: dateFrom,
                $lte: dateTo
            };
        }

        const paySheetResult = await PaySheet.find(query);

        if (paySheetResult && paySheetResult.length > 0) {
            return res.status(200).json(paySheetResult);
        } else {
            return res.status(200).json({ message: "No paySheet found" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Server error" });
    }




}

const deletePaySheet = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            message: "Missing id delete"
        })
    }

    try {
        let deletedPaySheet = await PaySheet.find({ _id: req.body.id });
        if (!deletedPaySheet) {
            res.status(200).json({ message: "PaySheeet is not exist" })
        }
        else {
            await PaySheet.deleteOne({ _id: req.body.id });
            res.status(200).json({ message: "PaySheet is delete!" })

        }




    } catch (e) {
        console.log(e)
    }


};

const editPaySheet = async (req, res) => {


    const EditPaySheet = await PaySheet.findById(req.body.id);

    if (EditPaySheet) {
        EditPaySheet.date = req.body.date || EditPaySheet.date;
        EditPaySheet.totalAmount = req.body.totalAmount || EditPaySheet.totalAmount;








        await EditPaySheet.save();

        res.status(200).json({
            message: "Updated successfully"
        });
    } else {
        res.status(404).json({ message: 'Register not found' });

    }
}

const createSubPaySheet = async (req, res) => {

    const { paySheetId, amount, invoiceNumber } = req.body;

    const result = await subPaySheet.create({
        paySheetId, amount, invoiceNumber
    })
    const EditPaySheet = await PaySheet.findById(paySheetId);
    if (EditPaySheet) {

        EditPaySheet.totalAmount = parseInt(EditPaySheet.totalAmount) || 0;
        const parsedAmount = parseInt(amount) || 0;

        EditPaySheet.totalAmount += parsedAmount;


        await EditPaySheet.save();
    }

    const EditRegister = await Register.findOne({invoiceNumber: invoiceNumber })
    if(EditRegister){
        
        EditRegister.status = 'c';
        await EditRegister.save();
    }

    if (result) {
        res.status(200).json({ message: 'SubPaySheet is created!!' })
    }
}

const getSubPaySheet = async (req, res) => {
    const id = req.query.id;
    try {
        if (id) {
            const subPaySheetResult = await subPaySheet.find({ paySheetId: id })
            if (subPaySheetResult) {

                res.status(200).json(subPaySheetResult);

            } else {
                res.status(200).json({ message: "No subPaySheet found" });
            }
        }
        else {
            const subPaySheetResults = await subPaySheet.find({})
            if (subPaySheetResults) {
                res.status(200).json(
                    subPaySheetResults
                )

            } else {
                res.status(200).json({ message: "No subPaySheets found" });

            }
        }

    } catch (e) {
        console.log(e)
    }




}

const deleteSubPaySheet = async (req, res) => {
    const { id, paySheetId } = req.body;
    if (!id) {
        return res.status(200).json({
            message: "Missing id delete"
        })
    }

    try {
        let deletedPaySheet = await subPaySheet.findOne({ _id: id });
        if (!deletedPaySheet) {
            res.status(200).json({ message: "PaySheeet is not exist" })
        }

        else {
            

            const EditPaySheet = await PaySheet.findById(paySheetId);
            if (EditPaySheet) {
                
                const parsedAmount = parseInt(deletedPaySheet.amount) || 0;
                
                EditPaySheet.totalAmount -= parsedAmount;


                await EditPaySheet.save();
            }

            await subPaySheet.deleteOne({ _id: req.body.id });
            res.status(200).json({ message: "PaySheet is delete!" })

            


        }




    } catch (e) {
        console.log(e)
    }


};









export {
    getRegisterList, createRegister, deleteRegister, EditRegister, getRegisterListByDate,
    createPaySheet, getPaySheet, deletePaySheet, editPaySheet, getPaySheetbyDate,
    createSubPaySheet, getSubPaySheet, deleteSubPaySheet
}