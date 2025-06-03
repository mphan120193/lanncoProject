import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  

  const authHeader = req.headers.authorization || req.headers.Authorization ;
  const token = authHeader && authHeader.split(' ')[1];
  //console.log('Token from client: ', token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.UserInfo.userId;
    req.roles = decoded.UserInfo.roles
    next();
  });
};

export default verifyJWT;