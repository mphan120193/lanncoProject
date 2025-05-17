import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const router = express.Router();

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { 
        "UserInfo" : {
            "userId": user._id,
            "roles": user.roles

        }
         
    
    },
    process.env.JWT_SECRET,
    { expiresIn: '2m' }
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

router.post('/register', async (req, res) => {
  const { email, password, roles } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, roles });
  await user.save();
  res.status(201).json({ message: 'User created' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
});

router.get('/refresh', async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403);

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (decoded.userId !== foundUser._id.toString()) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { 
        "UserInfo" : {
            "userId": foundUser._id,
            "roles": foundUser.roles
    
        }
        
        
    },

      
      process.env.JWT_SECRET,
      { expiresIn: '2m' }
    );
    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(403);
  }
});

router.post('/logout', async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = '';
    await user.save();
  }
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
});

export default router;