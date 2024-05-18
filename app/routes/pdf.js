import express from 'express';
import authJwt from '../middlewares/authJWT';
import { generatePdf } from '../controllers/pdf.controller';

const router = express.Router();

router.get('/generatePdf/:profileId', [authJwt.verifyToken], generatePdf);

export default router;
