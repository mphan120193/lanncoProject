import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { ROLES_LIST } from '../config/roles_list.js';
import { getAllusers } from '../controllers/authController.js';


const router = express.Router();

// const generateTokens = (user) => {
//     const accessToken = jwt.sign(
//         {
//             "UserInfo": {
//                 "userId": user._id,
//                 "roles": user.roles

//             }


//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '2m' }
//     );
//     const refreshToken = jwt.sign(
//         { userId: user._id },
//         process.env.JWT_REFRESH_SECRET,
//         { expiresIn: '7d' }
//     );
//     return { accessToken, refreshToken };
// };

router.post('/register', async (req, res) => {
    // const { email, password, roles } = req.body;

    
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new User({ email, password: hashedPassword, roles });
    // await user.save();
    // res.status(201).json({ message: 'User created' });

    const { firstName, lastName, email, password,
        address, phoneNumber, genderID, positionID } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    
  }

  const roles = ROLES_LIST.User;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password:hashedPassword,
    address,
    roles,
    phoneNumber,
    genderID,
    positionID,

  });

  if (user) {
    

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      roles: user.roles,

    });
  } else {
    res.status(400);
    
  }

});

router.post('/login', async (req, res) => {
    const cookies = req.cookies;
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userId": user._id,
                "roles": user.roles

            }


        },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
    );

    const newRefreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    let newRefreshTokenArray =
        !cookies?.jwt
            ? user.refreshToken
            : user.refreshToken.filter(rt => rt !== cookies.jwt);


    if (cookies?.jwt) {

        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken })
        // Detected refresh token reuse!
        if (!foundToken) {
            console.log('attempted refresh token reuse at login!')
            // clear out ALL previous refresh tokens
            newRefreshTokenArray = [];
        }
        res.clearCookie('jwt');
    }


    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];;
    await user.save();

    res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, 
    _id: user._id,
    role: user.roles,
    firstName: user.firstName
     });
});

router.get('/refresh', async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    res.clearCookie('jwt');

    const foundUser = await User.findOne({ refreshToken });
    //console.log('Found User: ', foundUser);

    // detected refresh token reuse!


    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                console.log('attempted refresh token reuse!')
                const hackedUser = await User.findOne({ email: decoded.email }).exec();
                console.log('hackUsed: ', hackedUser )
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
                console.log(result);
            }
        )
        return res.sendStatus(403);
    }

   

    let newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    //console.log('newRefreshTokenArray: ' ,newRefreshTokenArray);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {

        if (err) {
            console.log('expired refresh token')
            foundUser.refreshToken = [...newRefreshTokenArray];
            const result = await foundUser.save();
            console.log(result);
        }

        if (err || decoded.userId !== foundUser._id.toString()) return res.sendStatus(403);

        // Refresh token was still valid
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "userId": foundUser._id,
                    "roles": foundUser.roles

                }


            },


            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );

        const newRefreshToken = jwt.sign(
            { userId: foundUser._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );
        //console.log('new refresh token: ', newRefreshToken);

        // Saving refreshToken with current user
        newRefreshTokenArray.push(newRefreshToken);
        //foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        //console.log('New Refresh Token Array: ', newRefreshTokenArray );
        
        foundUser.refreshToken= newRefreshTokenArray;
        await foundUser.save();

        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });

    })



});

router.post('/logout', async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });
    if (user) {
        // user.refreshToken = '';
        user.refreshToken = user.refreshToken.filter(rt => rt !== refreshToken);
        await user.save();
    }
    res.clearCookie('jwt');
    res.json({ message: 'Logged out' });
});



router.get('/get-all-user', getAllusers  );

export default router;