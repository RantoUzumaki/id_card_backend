import express from 'express';
import { getDetails, signIn, signup } from '../controllers/auth.controller';
import authJwt from '../middlewares/authJWT';

const router = express.Router();

router.post('/register', signup);
router.post('/login', signIn);
router.get('/getUserDetails', [authJwt.verifyToken], getDetails);

export default router;
