import express from 'express';
import { getAllProfiles, saveProfile } from '../controllers/profile.controller';
import authJwt from '../middlewares/authJWT';

const router = express.Router();

router.post('/individuals-add', [authJwt.verifyToken], saveProfile);
router.get('/get-all-profiles/:pageSize/:page', [authJwt.verifyToken], getAllProfiles);

export default router;
