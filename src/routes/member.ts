import { Router } from "express";
import { MemberController } from "../controller/MemberController";
//import { validateMember } from "../middlewares/member.validator";
import { checkRole } from "../middlewares/role";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

router.get("/", MemberController.getAll);

router.get("/:id", MemberController.getById);

router.post("/", /*validateCategory,*/ [/*checkJwt, checkRole(['admin'])*/], MemberController.createMember);

router.patch("/:id", /*validateCategory,*/ [/*checkJwt, checkRole(['admin'])*/], MemberController.updateMember);

router.delete("/:id", [/*checkJwt, checkRole(['admin'])*/], MemberController.deleteMember);

export default router;