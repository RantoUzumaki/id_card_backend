import express from 'express';
import { getDistrictList, getStateList, getSubDistrictList, getVillageList } from '../controllers/common.controller';
import authJwt from '../middlewares/authJWT';

const router = express.Router();

router.get('/state_list', [authJwt.verifyToken], getStateList);
router.get('/district_list/:state_code', [authJwt.verifyToken], getDistrictList);
router.get('/sub_district_list/:state_code/:district_code', [authJwt.verifyToken], getSubDistrictList);
router.get('/village_list/:state_code/:district_code/:SubDistrict_code', [authJwt.verifyToken], getVillageList);

export default router;
