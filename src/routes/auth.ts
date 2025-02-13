import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/jwt";
import { validateLogin, validatePassword } from "../middlewares/users.validator";

const router = Router();

//login 
router.post("/login", validateLogin, AuthController.login);

//Forgot password
router.post("/forgot-password", AuthController.forgotPassword);

router.post("/authorize-password", AuthController.autorizationPassword);

router.post("/new-password-reset", AuthController.newPasswordReset)

//Create new password
router.put("/new-password", AuthController.createNewPassword);

//Change password
router.post("/change-password", validatePassword, [checkJwt], AuthController.changePassword);


export default router;
