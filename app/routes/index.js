
import express from "express";
import auth from "./auth";
import common from "./common";
import profile from "./profile";
import pdf from "./pdf";

const router = express.Router();

router.use("/", auth);
router.use("/", common);
router.use("/", profile);
router.use("/", pdf);

export default router;
