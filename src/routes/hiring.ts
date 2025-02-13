import {Router} from "express";
import HiringController from "../controller/HiringController";
import { validateMail } from "../middlewares/mail.validator";
const router = Router();

//Send email
router.post("/send-email", validateMail, HiringController.sendEmails);

export default router;