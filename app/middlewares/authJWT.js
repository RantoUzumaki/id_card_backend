import jwt from 'jsonwebtoken';
import { secret } from '../config/auth';

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({ error: 'No token provided' });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Token has expired, Please login again.' });
      return;
    }

    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken
};

export default authJwt;
